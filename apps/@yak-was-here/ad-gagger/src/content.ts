import {
    addTabToMutedList,
    getCurrentTabId,
    isTabIdInMutedList,
    isCurrentTabMuted,
    removeTabFromMutedList,
    getSiteConfiguration,
    setTabMuteState,
    // retrieveSavedSettings,
} from './lib';
import { Settings, SiteConfiguration, defaultSettings } from './types';

const init = async () => {
    // Keep track of whether we have simulated a skip button click so that it does not lock up the browser from too many mutations
    // let didClickSkipButton = false;

    const settings = await getSettings();
    const siteConfiguration = getSiteConfiguration(
        settings.siteConfigurations,
        window.location.href
    );

    if (!siteConfiguration) {
        console.log('Ad Gagger: No site configuration found for this URL');
        return;
    }

    if (siteConfiguration && !siteConfiguration.active) {
        console.log('Ad Gagger: Site configuration is not active');
        return;
    }

    const tabId = await getCurrentTabId();
    const inMutedList = await isTabIdInMutedList(tabId);
    const muted = await isCurrentTabMuted();

    // Syncs the mute state of the current tab with the extension's last stored state for the tab
    if (inMutedList && !muted) {
        setTabMuteState(tabId, true);

        console.log('Ad Gagger: Tab found in muted list');
    }

    const adContainer =
        (siteConfiguration.adContainerSelector &&
            document.querySelector(siteConfiguration.adContainerSelector)) ||
        document;

    // check if ad is already active
    const ad: Element | null = adContainer.querySelector(
        siteConfiguration.adSelector
    );

    if (ad) {
        handleTabMute(tabId);
        console.log('Ad Gagger: Ad already exists');

        observeAdEnd(adContainer, siteConfiguration, tabId);
    } else {
        // otherwise, the ad does not exist yet, so we need to wait for it to appear
        observeAdStart(adContainer, siteConfiguration, tabId);
    }

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

    // Listen for settings updates from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'SETTINGS_UPDATED') {
            init();
        }
    });
};

window.addEventListener('load', init);

/**
 * Mutes the tab if it is not already muted by the extension (indicated by being in the muted list); otherwise it might have been unmuted by the user (maybe they are interested in the ad)
 * @param tabId 
 */
const handleTabMute = async (tabId: number): Promise<void> => {
    const inMutedList = await isTabIdInMutedList(tabId);
    const muted = await isCurrentTabMuted();
    if (!inMutedList && !muted) {
        setTabMuteState(tabId, true);
        
        console.log('Ad Gagger: Muted tab.');
    }
    addTabToMutedList(tabId);
}

/**
 * Unmutes the tab if it was muted by the extension (indicated by being in the muted list); otherwise it might have been muted by the user
 * @param tabId 
 */
const handleTabUnmute = async (tabId: number): Promise<void> => {
    const inMutedList = await isTabIdInMutedList(tabId);
    const muted = await isCurrentTabMuted();
    if (inMutedList && muted) {
        setTabMuteState(tabId, false);
        
        console.log('Ad Gagger: Unmuted tab.');
    }
    removeTabFromMutedList(tabId);
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
 * Retrieves the settings for the extension or falls back to default settings.
 * @returns The settings for the extension.
 */
const getSettings = async (): Promise<Settings> => {
    // const savedSettings = await retrieveSavedSettings();
    const savedSettings: Settings | null = null;

    if (savedSettings === null) {
        console.log('Ad Gagger: No saved settings found, using default settings');
    }

    return savedSettings || defaultSettings;
}

/**
 * Observes the end of an ad by monitoring the ad container for changes.
 * @param adContainer - The container element that holds the ad.
 * @param siteConfiguration - The configuration settings for the site.
 * @param tabId - The ID of the current tab.
 */
const observeAdEnd = (adContainer: Document | Element, siteConfiguration: SiteConfiguration, tabId: number) => {
    const adEndObserver = new MutationObserver(() => {
        if (!adContainer.querySelector(siteConfiguration.adSelector)) {
            adEndObserver.disconnect();
            handleTabUnmute(tabId);
            console.log('Ad Gagger: Ad ended');
        }
    });

    adEndObserver.observe(adContainer, {
        childList: true,
        subtree: true,
    });
}

/**
 * Observes the start of an ad by monitoring the ad container for changes.
 * @param adContainer - The container element that holds the ad.
 * @param siteConfiguration - The configuration settings for the site.
 * @param tabId - The ID of the current tab.
 */
const observeAdStart = (adContainer: Document | Element, siteConfiguration: SiteConfiguration, tabId: number) => {
    const adStartObserver = new MutationObserver(() => {
        const ad: Element | null = adContainer.querySelector(
            siteConfiguration.adSelector
        );
        if (ad) {
            adStartObserver.disconnect();
            handleTabMute(tabId);
            console.log('Ad Gagger: Ad started');

            observeAdEnd(adContainer, siteConfiguration, tabId);
        }
    });

    adStartObserver.observe(adContainer, {
        childList: true,
        subtree: true,
    });
}

