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
import { Settings, defaultSettings } from './types';

/**
 * Mutes the tab if it is not already muted by the extension (indicated by being in the muted list); otherwise it might have been unmuted by the user (maybe they are interested in the ad)
 * @param tabId 
 */
async function handleTabMute(tabId: number): Promise<void> {
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
async function handleTabUnmute(tabId: number): Promise<void> {
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


function createDebouncedHandler(wait: number, handler: () => void): () => void {
    let timeout: number;
    
    return () => {
        // Clear any existing timeout
        window.clearTimeout(timeout);
        
        // Set new timeout
        timeout = window.setTimeout(handler, wait);
    };
}

const getSettings = async (): Promise<Settings> => {
    // const savedSettings = await retrieveSavedSettings();
    const savedSettings: Settings | null = null;

    if (savedSettings === null) {
        console.log('Ad Gagger: No saved settings found, using default settings');
    }

    // save default settings to sync storage

    return savedSettings || defaultSettings;
}

const init = async () => {
    // Keep track of whether we have simulated a skip button click so that it does not lock up the browser from too many mutations
    // let didClickSkipButton = false;
    
    const settings = await getSettings();
    const siteConfiguration = getSiteConfiguration(settings.siteConfigurations, window.location.href);

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

    console.log('Ad Gagger: inMutedList', inMutedList);

    // Syncs the mute state of the current tab with the extension's last stored state for the tab
    if (inMutedList && !muted) {
        setTabMuteState(tabId, true);
    }

    if (siteConfiguration) {

        const adContainer = (siteConfiguration.adContainerSelector && document.querySelector(siteConfiguration.adContainerSelector)) || document;
        
        const ad: Element | null = adContainer.querySelector(siteConfiguration.adSelector);

        // if the ad already exists
        if (ad) {
            handleTabMute(tabId);
            console.log('Ad Gagger: Ad already exists');
            console.log('Ad Gagger: tabId', tabId, 'inMutedList', inMutedList, 'muted', muted);
            

            // Set up observer to detect when the ad is over
            const adEndObserver = new MutationObserver(() => {
                if (!adContainer.querySelector(siteConfiguration.adSelector)) {
                    handleTabUnmute(tabId);
                    console.log('Ad Gagger: Ad no longer exists');
                    console.log('Ad Gagger: tabId', tabId, 'inMutedList', inMutedList, 'muted', muted);
                    adEndObserver.disconnect();
                }
            });

            adEndObserver.observe(adContainer, {
                childList: true,
                subtree: true,
            });

            return;
        }

        // otherwise, the ad does not exist yet, so we need to wait for it to appear

        // Set up observer to detect appearance
        const adStartObserver = new MutationObserver(() => {
            const ad: Element | null = adContainer.querySelector(siteConfiguration.adSelector);
            if (ad) {
                handleTabMute(tabId);
                console.log('Ad Gagger: Ad started playing');
                console.log('Ad Gagger: tabId', tabId, 'inMutedList', inMutedList, 'muted', muted);

                // Transition to observing for disappearance
                adStartObserver.disconnect();
                const adEndObserver = new MutationObserver(() => {
                    if (!adContainer.querySelector(siteConfiguration.adSelector)) {
                        handleTabUnmute(tabId);
                        console.log('Ad Gagger: Ad ended');
                        console.log('Ad Gagger: tabId', tabId, 'inMutedList', inMutedList, 'muted', muted);
                        adEndObserver.disconnect();
                    }
                });

                adEndObserver.observe(adContainer, {
                    childList: true,
                    subtree: true,
                });
            }
        });

        adStartObserver.observe(adContainer, {
            childList: true,
            subtree: true,
        });

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











        // Initial check
        // handleElementChange(siteConfiguration);

    }

    // Listen for settings updates from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'SETTINGS_UPDATED') {
            init();
        }
    });
};

window.addEventListener('load', init);
