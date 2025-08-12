import {
    retrieveCurrentTabId,
    getSiteConfiguration,
    retrieveSavedSettings,
    urlsHaveSameHostname,
    handleTabUnmute,
    handleTabMute,
} from './lib';
import { Settings, SiteConfiguration, defaultSettings } from './types';

/**
 * For keeping track of all active mutation observers
 */
const activeObservers: MutationObserver[] = [];

/**
 * The URL that will be used for selecting a site configuration
 */
let siteConfigurationURL: string | null = null;

/**
 * Settings for the extension
 */
let settings: Settings | null = null;

/**
 * Configuration for the currentURL
 */
let siteConfiguration: SiteConfiguration | null = null;

/**
 * The current tab id; it is set once in init() and should never change
 */
let currentTabId: number | null = null;

// Wait for DOM content to start detecting ads
document.addEventListener('DOMContentLoaded',  () => {
    setUpAdDetection();
});

// Listen for settings updates from popup and reinitializes
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'SETTINGS_UPDATED') {
        updateSettings();
    }
});

// Handle SPA navigation where full page reloads do not trigger the extension 
// content script to be reinitialized automatically.
// Optimized for React 18+ concurrent features and state batching
// with a fallback URL interval checker

/**
 * Centralized navigation handler
 */
const handleNavigation = (navigationSource: string) => {
    const newURL = window.location.href;
    if (newURL !== siteConfigurationURL) {
        console.log(`Ad Gagger: Navigation detected via ${navigationSource}:`, siteConfigurationURL, '->', newURL);
        updateSiteConfiguration();
    }
};

// Listen for back/forward button navigation
window.addEventListener('popstate', () => {
    handleNavigation('popstate');
});

// Listen for programmatic navigation (pushState/replaceState)
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function(...args) {
    originalPushState.apply(history, args);
    // React 18+ may batch updates, use multiple timing checks
    handleNavigation('pushState-sync');
    setTimeout(() => handleNavigation('pushState-batch'), 0); // Next tick
    setTimeout(() => handleNavigation('pushState-delayed'), 50); // After React updates
};

history.replaceState = function(...args) {
    originalReplaceState.apply(history, args);
    // React 18+ may batch updates, use multiple timing checks  
    handleNavigation('replaceState-sync');
    setTimeout(() => handleNavigation('replaceState-batch'), 0); // Next tick
    setTimeout(() => handleNavigation('replaceState-delayed'), 50); // After React updates
};

let urlCheckInterval: number;
/**
 * Clear the interval for the URL watcher if once exists
 */
const cleanUpURLWatcher = () => {
    if (urlCheckInterval) {
        clearInterval(urlCheckInterval);
    }
}

/**
 * Starts a periodic URL watcher to handle cases where navigation events are missed; a fallback technique
 */
const startURLWatcher = () => {
    cleanUpURLWatcher();
    urlCheckInterval = window.setInterval(() => {
        handleNavigation('interval-watcher');
    }, 2000);
};
startURLWatcher();

// !Listen for custom framework events (uncomment as needed)
// document.addEventListener('routechange', () => handleNavigation('custom-routechange'));
// window.addEventListener('locationchange', () => handleNavigation('custom-locationchange'));

// !Intersection Observer for YouTube?

/**
 * Initialize
 */
const init = async () => {
    console.log('Ad Gagger: Initializing');

    currentTabId = await retrieveCurrentTabId();

    await handleTabUnmute(await getTabId());

    await loadSettings();
    siteConfigurationURL = window.location.href;
    await loadSiteConfiguration();
}

/**
 * Update settings; should only be called when settings actually change
 */
const updateSettings = async () => {
    console.log('Ad Gagger: Updating settings');

    await loadSettings();
    await updateSiteConfiguration();
}

/**
 * Update site configuration; should only be called when settings change or URL changes
 */
const updateSiteConfiguration = async () => {
    console.log('Ad Gagger: Updating site configuration');

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
        console.log(`Ad Gagger: Settings not yet available. Trying again in ${startingTimeoutMs}ms`);
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
    console.log('Ad Gagger: activeObservers after cleanup: ', activeObservers);

    if (!settings) {
        waitForSettings();
        return;
    }

    if (!siteConfiguration) {
        console.log('Ad Gagger: No site configuration found for this URL.', siteConfigurationURL);
        return;
    }

    if (siteConfiguration && !siteConfiguration.active) {
        console.log('Ad Gagger: Site configuration found but it is not active.');
        return;
    }

    // Keep track of whether we have simulated a skip button click so that it does not lock up the browser from too many mutations
    // let didClickSkipButton = false;

    const adContainer =
        (siteConfiguration.adContainerSelector &&
            document.querySelector(siteConfiguration.adContainerSelector)) ||
        document;

    waitForAdStart(adContainer, siteConfiguration, await getTabId());

    console.log('Ad Gagger: activeObservers after waitForAdStart: ', activeObservers);

    // const adObserver = new MutationObserver(
    //     createDebouncedHandler(100, () => {
    //         handleElementChange(siteConfiguration);
    //     })
    // );

    // // Use the adContainerSelector if it exists, otherwise use the body
    // const adContainerSelector =
    //     document.querySelector(siteConfiguration.adContainerSelector) ||
    //     document.body;

    // console.log('Ad Gagger: adContainerSelector', adContainerSelector);
    // console.log(
    //     'Ad Gagger: adDetectionElementSelector',
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
    await handleTabUnmute(await getTabId());
    cleanUpObservers();
};

/**
 * Cleans up old observers
 */
const cleanUpObservers = () => {
    if (activeObservers.length > 0) {
        activeObservers.forEach((observer) => observer.disconnect());
        activeObservers.length = 0;

        console.log('Ad Gagger: Cleaned up old observers');
    }
}

// function handleSkipButtonChange(siteSettings: SiteConfiguration) {
//     const skipButton = document.querySelector(siteSettings.adCloseButtonSelector) as HTMLButtonElement;
//     console.log('Ad Gagger: skipButton', skipButton);
//     console.log('Ad Gagger: didClickSkipButton', didClickSkipButton);

//     if (
//         !didClickSkipButton &&
//         skipButton &&
//         skipButton.offsetParent !== null &&
//         !skipButton.disabled
//     ) {
//         console.log('Ad Gagger: Skip button detected. Skipping ad.');

//         try {
//             // Try direct click first
//             skipButton.click();

//             // // If that doesn't work, try simulating a full mouse click sequence
//             // skipButton.dispatchEvent(
//             //     new MouseEvent('mouseover', {
//             //         view: window,
//             //         bubbles: true,
//             //         cancelable: true,
//             //     })
//             // );

//             // skipButton.dispatchEvent(
//             //     new MouseEvent('mousedown', {
//             //         view: window,
//             //         bubbles: true,
//             //         cancelable: true,
//             //     })
//             // );

//             // skipButton.dispatchEvent(
//             //     new MouseEvent('mouseup', {
//             //         view: window,
//             //         bubbles: true,
//             //         cancelable: true,
//             //     })
//             // );

//             // skipButton.dispatchEvent(
//             //     new MouseEvent('click', {
//             //         view: window,
//             //         bubbles: true,
//             //         cancelable: true,
//             //     })
//             // );

//             didClickSkipButton = true;
//         } catch (e) {
//             console.error('Ad Gagger: Error skipping ad', e);
//         }
//     }

//     console.log('Ad Gagger: didClickSkipButton', didClickSkipButton);

//     setTimeout(() => {
//         didClickSkipButton = false;
//         console.log('Ad Gagger: didClickSkipButton', didClickSkipButton);
//     }, 5000);
// }


// const createDebouncedHandler = (wait: number, handler: () => void): (() => void) => {
//     let timeout: number;
    
//     return () => {
//         // Clear any existing timeout
//         window.clearTimeout(timeout);
        
//         // Set new timeout
//         timeout = window.setTimeout(handler, wait);
//     };
// }

/**
 * Loads the saved settings or falls back to default settings.
 */
const loadSettings = async () => {
    console.log('Ad Gagger: Loading settings');

    // const savedSettings = await retrieveSavedSettings();
    const savedSettings: Settings | null = null;

    if (savedSettings === null) {
        settings = defaultSettings;
        console.log('Ad Gagger: No saved settings found, using default settings', defaultSettings);
    } else {
        settings = savedSettings;
        console.log('Ad Gagger: Using saved settings', savedSettings);
    }

}

/**
 * Loads the site configuration from current settings.
 */
const loadSiteConfiguration = async () => {
    console.log('Ad Gagger: Loading site configuration');

    if (!settings || !siteConfigurationURL) {
        console.log('Ad Gagger: Could not load site configuration');
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

            console.log('Ad Gagger: Ad ended');
            console.log('Ad Gagger: activeObservers: ', activeObservers);

            waitForAdStart(adContainer, siteConfiguration, tabId);
        }
    });

    startObserver(adEndObserver, adContainer);

    console.log('Ad Gagger: Waiting for ad end');
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

            console.log('Ad Gagger: Ad started');
            console.log(
                'Ad Gagger: activeObservers: ',
                activeObservers
            );

            waitForAdEnd(adContainer, siteConfiguration, tabId);
        }
    });

    startObserver(adStartObserver, adContainer);

    console.log('Ad Gagger: Waiting for ad start');
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

/**
 * Gets the current tab ID variable value if it is already available otherwise retrieves it from chrome runtime.
 * @returns The current tab ID.
 */
const getTabId = async (): Promise<number> => {
    if (currentTabId) return currentTabId;
    return await retrieveCurrentTabId();
}

init();
