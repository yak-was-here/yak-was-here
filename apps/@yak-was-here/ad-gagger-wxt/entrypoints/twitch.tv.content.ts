import { ContentScriptContext } from '#imports';
import { defaultSettings, Settings, SiteConfiguration } from '@/types';
import { getSiteConfiguration, handleTabMute, handleTabUnmute, retrieveCurrentTabId, urlsHaveSameHostname } from '@/lib';

const MATCH_STRING = '*://*.twitch.tv/*';

/**
 * For keeping track of all active mutation observers
 */
const activeObservers: MutationObserver[] = [];

/**
 * The URL that will be used for selecting a site configuration
 */
let siteConfigurationURL: string | null = null; // TODO: replace with URL_PATTERN above

/**
 * Settings for the extension
 */
let settings: Settings | null = null; // TODO: this simply becomes an array of objects indicating an enabled or disabled state for each supported site

/**
 * Configuration for the currentURL
 */
let siteConfiguration: SiteConfiguration | null = null; // TODO: this simply becomes an enabled or disabled for this site

export default defineContentScript({
    matches: [MATCH_STRING],
    async main(ctx) {

        initTab();
        setUpAdDetection();

        // await injectScript('/example-main-world.js', {
        //     keepInDom: true,
        // });

        // https://wxt.dev/guide/essentials/content-scripts.html#dealing-with-spas
        // Technically we don't need to do this since we are only handling domains not specific URLs within the domains.
        ctx.addEventListener(window, 'wxt:locationchange', ({ oldUrl, newUrl }) => {
            if (new MatchPattern(MATCH_STRING).includes(newUrl)) {
                console.log(
                    `Detected location change:\n${oldUrl} ➡️ ${newUrl}`
                );
                handleUrlChangeWithinSameDomain(ctx);
            }
        });
    },
});

const handleUrlChangeWithinSameDomain = (ctx: ContentScriptContext) => {
    updateSiteConfiguration();
};

/**
 * Initialize tab
 */
const initTab = async () => {
    console.log('Initializing tab...');

    await handleTabUnmute(await retrieveCurrentTabId());

    await loadSettings();
    siteConfigurationURL = window.location.href;
    await loadSiteConfiguration();
}

/**
 * Update settings; should only be called when settings actually change
 */
const updateSettings = async () => {
    console.log('Updating settings');

    await loadSettings();
    await updateSiteConfiguration();
}

/**
 * Update site configuration; should only be called when settings change or URL changes
 */
const updateSiteConfiguration = async () => {
    console.log('Updating site configuration');

    const oldURL = siteConfigurationURL;
    const newURL = window.location.href;
    siteConfigurationURL = newURL;

    if (!urlsHaveSameHostname(newURL, oldURL ?? '')) {
        await loadSiteConfiguration();
    }

    setUpAdDetection();
}

/**
 * Waits for settings. Uses exponential backoff if settings are null, doubling the timeout each retry.
 * @param startingTimeoutMs - Starting timeout in milliseconds (defaults to 100ms)
 */
const waitForSettings = (startingTimeoutMs = 100) => {
    if (settings) {
        setUpAdDetection();
    } else {
        console.log(`Settings not yet available. Trying again in ${startingTimeoutMs}ms`);
        setTimeout(() => {
            waitForSettings(startingTimeoutMs * 2);
        }, startingTimeoutMs);
    }
};

/**
 * Detection runs after the DOM content is loaded
 * @returns 
 */
const setUpAdDetection = async () => {
    await cleanup();
    console.log('activeObservers after cleanup: ', activeObservers);

    if (!settings) {
        waitForSettings();
        return;
    }

    if (!siteConfiguration) {
        console.log('No site configuration found for this URL.', siteConfigurationURL);
        return;
    }

    if (siteConfiguration && !siteConfiguration.enabled) {
        console.log('Site configuration found but it is not active.');
        return;
    }

    // Keep track of whether we have simulated a skip button click so that it does not lock up the browser from too many mutations
    // let didClickSkipButton = false;

    const adContainer =
        (siteConfiguration.adContainerSelector &&
            document.querySelector(siteConfiguration.adContainerSelector)) ||
        document;

    waitForAdStart(
        adContainer,
        siteConfiguration,
        await retrieveCurrentTabId()
    );

    console.log('activeObservers after waitForAdStart: ', activeObservers);

    // const adObserver = new MutationObserver(
    //     createDebouncedHandler(100, () => {
    //         handleElementChange(siteConfiguration);
    //     })
    // );

    // // Use the adContainerSelector if it exists, otherwise use the body
    // const adContainerSelector =
    //     document.querySelector(siteConfiguration.adContainerSelector) ||
    //     document.body;

    // console.log('adContainerSelector', adContainerSelector);
    // console.log(
    //     'adDetectionElementSelector',
    //     siteConfiguration.adDetectorSelector
    // );

    // adObserver.observe(adContainerSelector, {
    //     childList: true, // Watch for changes in direct children
    //     subtree: true, // Watch for changes in all descendants
    //     attributes: true, // Watch for attribute changes
    // });

    // if (siteSettings.adCloseButtonSelector) {
    //     const skipButtonObserver = new MutationObserver(() => {
    //         handleSkipButtonChange(siteSettings);
    //     });

    //     skipButtonObserver.observe(adContainerSelector, {
    //         childList: true, // Watch for changes in direct children
    //         subtree: true, // Watch for changes in all descendants
    //         attributes: true, // Watch for attribute changes
    //     });

    //     // Initial check
    //     handleSkipButtonChange(siteSettings);
    // }

};

/**
 * Cleanup tasks
 */
const cleanup = async () => {
    await handleTabUnmute(await retrieveCurrentTabId());
    cleanUpObservers();
};

/**
 * Cleans up old observers
 */
const cleanUpObservers = () => {
    if (activeObservers.length > 0) {
        activeObservers.forEach((observer) => observer.disconnect());
        activeObservers.length = 0;

        console.log('Cleaned up old observers');
    }
}

/**
 * Loads the saved settings or falls back to default settings.
 */
const loadSettings = async () => {
    console.log('Loading settings');

    // const savedSettings = await retrieveSavedSettings();
    const savedSettings: Settings | null = null;

    if (savedSettings === null) {
        settings = defaultSettings;
        console.log('No saved settings found, using default settings', defaultSettings);
    } else {
        settings = savedSettings;
        console.log('Using saved settings', savedSettings);
    }

}

/**
 * Loads the site configuration from current settings.
 */
const loadSiteConfiguration = async () => {
    console.log('Loading site configuration');

    if (!settings || !siteConfigurationURL) {
        console.log('Could not load site configuration');
        return;
    }

    siteConfiguration = getSiteConfiguration(
        settings.siteConfigurations,
        siteConfigurationURL
    );
}

/**
 * Observes the end of an ad by monitoring the ad container for the disappearance of the adSelector element.
 * @param adContainer - The container element that holds the ad.
 * @param siteConfiguration - The configuration settings for the site.
 * @param tabId - The ID of the current tab.
 */
const waitForAdEnd = (adContainer: Document | Element, siteConfiguration: SiteConfiguration, tabId: number) => {
    cleanUpObservers();

    const adEndObserver = new MutationObserver(async () => {
        if (!adContainer.querySelector(siteConfiguration.adSelector)) {
            await handleTabUnmute(tabId);

            stopObserver(adEndObserver);

            console.log('Ad ended');
            console.log('activeObservers: ', activeObservers);

            waitForAdStart(adContainer, siteConfiguration, tabId);
        }
    });

    startObserver(adEndObserver, adContainer);

    console.log('Waiting for ad end');
}

/**
 * Observes the start of an ad by monitoring the ad container for the addition of the adSelector element.
 * @param adContainer - The container element that holds the ad.
 * @param siteConfiguration - The configuration settings for the site.
 * @param tabId - The ID of the current tab.
 */
const waitForAdStart = (adContainer: Document | Element, siteConfiguration: SiteConfiguration, tabId: number) => {
    cleanUpObservers();

    const adStartObserver = new MutationObserver(async () => {
        if (adContainer.querySelector(siteConfiguration.adSelector)) {
            await handleTabMute(tabId);

            stopObserver(adStartObserver);

            console.log('Ad started');
            console.log(
                'activeObservers: ',
                activeObservers
            );

            waitForAdEnd(adContainer, siteConfiguration, tabId);
        }
    });

    startObserver(adStartObserver, adContainer);

    console.log('Waiting for ad start');
}

/**
 * Cleans up a observer by disconnecting and removing it from the active observers list.
 * @param observer - The MutationObserver to stop.
 */
const stopObserver = (observer: MutationObserver) => {
    observer.disconnect();

    // Remove from active observers list
    const index = activeObservers.indexOf(observer);
    if (index > -1) activeObservers.splice(index, 1);
};

/**
 * Uses an observer to start observing for mutations and adds the observer to the active observers list.
 * @param observer - The MutationObserver to start.
 * @param root - The root element to observe.
 */
const startObserver = (
    observer: MutationObserver,
    root: Document | Element
) => {
    activeObservers.push(observer);
    observer.observe(root, {
        childList: true,
        subtree: true,
    });
};
