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

/**
 * For keeping track of all active mutation observers
 */
const activeObservers: MutationObserver[] = [];

/**
 * Track current URL for navigation detection
 */
let currentURL = window.location.href;

/**
 * Settings for the extension
 */
let settings: Settings | null = null;

/**
 * Configuration for the currentURL
 */
let siteConfiguration: SiteConfiguration | null = null;

// Wait for DOM content to start detecting ads
document.addEventListener('DOMContentLoaded',  () => {
    startDetection();
});

// Listen for settings updates from popup and reinitializes
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'SETTINGS_UPDATED') {
        init();
    }
});

// Handle SPA navigation where full page reloads do not trigger the extension content script to be reinitialized automatically

// Listen for back/forward button navigation and reinitialize
window.addEventListener('popstate', () => {
    console.log('Ad Gagger: popstate fired', window.location.href, 'vs', currentURL);
    if (window.location.href !== currentURL) {
        console.log('Ad Gagger: Navigation detected via popstate');
        init();
    }
});

// Listen for programmatic navigation (pushState/replaceState) and reinitialize
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function(...args) {
    console.log('Ad Gagger: pushState called with args:', args);
    originalPushState.apply(history, args);
    setTimeout(() => {
        console.log('Ad Gagger: After pushState, URL:', window.location.href, 'vs', currentURL);
        if (window.location.href !== currentURL) {
            console.log('Ad Gagger: Navigation detected via pushState');
            init();
        }
    }, 100); // Increased timeout
};

history.replaceState = function(...args) {
    console.log('Ad Gagger: replaceState called with args:', args);
    originalReplaceState.apply(history, args);
    setTimeout(() => {
        console.log('Ad Gagger: After replaceState, URL:', window.location.href, 'vs', currentURL);
        if (window.location.href !== currentURL) {
            console.log('Ad Gagger: Navigation detected via replaceState');
            init();
        }
    }, 100); // Increased timeout
};

// Add a fallback URL watcher for debugging
setInterval(() => {
    if (window.location.href !== currentURL) {
        console.log('Ad Gagger: URL changed detected by interval watcher:', currentURL, '->', window.location.href);
        init();
    }
}, 1000);

/**
 * Initialization runs before the DOM is loaded
 */
const init = async () => {
    await cleanup();

    console.log('Ad Gagger: Initializing content script');

    const tabId = await getCurrentTabId();
    const muted = await isCurrentTabMuted();
    const inMutedList = await isTabIdInMutedList(tabId);
    
    // Update the current URL tracking
    currentURL = window.location.href;

    // Syncs the mute state of the current tab with the extension's last stored state for the tab (it may still be on the muted list after navigation or on reloads, but if the tab is closed the tab id will automatically be removed from the mute list)
    if (inMutedList && !muted) {
        setTabMuteState(tabId, true);

        console.log('Ad Gagger: Tab found in muted list');
    }

    settings = await getSettings();
    siteConfiguration = getSiteConfiguration(
        settings.siteConfigurations,
        currentURL
    );

}

// First-time initialization
init();

/**
 * Checks if the site configuration is usable.
 * @param siteConfiguration The site configuration to check.
 * @returns True if the site configuration is usable, false otherwise.
 */
const canUseSiteConfiguration = (
    siteConfiguration: SiteConfiguration | null
): boolean => {
    if (!siteConfiguration) {
        console.log('Ad Gagger: No site configuration found for this URL.');
        return false;
    }

    if (siteConfiguration && !siteConfiguration.active) {
        console.log('Ad Gagger: Site configuration is not active.');
        return false;
    }

    return true;
};

/**
 * Detection runs after the DOM content is loaded
 * @returns 
 */
const startDetection = async () => {
    if (!canUseSiteConfiguration(siteConfiguration) || !siteConfiguration) {
        return;
    }

    // Keep track of whether we have simulated a skip button click so that it does not lock up the browser from too many mutations
    // let didClickSkipButton = false;

    const adContainer =
        (siteConfiguration.adContainerSelector &&
            document.querySelector(siteConfiguration.adContainerSelector)) ||
        document;

    waitForAdStart(adContainer, siteConfiguration, await getCurrentTabId());

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
 * Cleanup
 */
const cleanup = async () => {
    activeObservers.forEach((observer) => observer.disconnect());
    activeObservers.length = 0;

    console.log('Ad Gagger: Cleaned up');
};

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
 * Observes the end of an ad by monitoring the ad container for the disappearance of the adSelector element.
 * @param adContainer - The container element that holds the ad.
 * @param siteConfiguration - The configuration settings for the site.
 * @param tabId - The ID of the current tab.
 */
const waitForAdEnd = (adContainer: Document | Element, siteConfiguration: SiteConfiguration, tabId: number) => {
    const adEndObserver = new MutationObserver(() => {
        if (!adContainer.querySelector(siteConfiguration.adSelector)) {
            handleTabUnmute(tabId);

            stopObserver(adEndObserver);

            console.log('Ad Gagger: Ad ended');
        }
    });

    startObserver(adEndObserver, adContainer);
}

/**
 * Observes the start of an ad by monitoring the ad container for the addition of the adSelector element.
 * @param adContainer - The container element that holds the ad.
 * @param siteConfiguration - The configuration settings for the site.
 * @param tabId - The ID of the current tab.
 */
const waitForAdStart = (adContainer: Document | Element, siteConfiguration: SiteConfiguration, tabId: number) => {
    const adStartObserver = new MutationObserver(() => {
        if (adContainer.querySelector(siteConfiguration.adSelector)) {
            handleTabMute(tabId);

            stopObserver(adStartObserver);

            console.log('Ad Gagger: Ad started');

            waitForAdEnd(adContainer, siteConfiguration, tabId);
        }
    });

    startObserver(adStartObserver, adContainer);
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

