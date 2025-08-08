import {
    addTabToMutedList,
    getCurrentTabId,
    isTabIdInMutedList,
    isCurrentTabMuted,
    removeTabFromMutedList,
    selectSiteSettings as getSiteConfiguration,
    setTabMuteState,
    syncTabMuteStateWithStorage,
    retrieveSavedSettings,
} from './lib';
import { Settings, defaultSettings, SiteConfiguration, StorageKeys } from './types';

/**
 *  ! This should only be called when the parent of the ad detector selector changes and it should be debounced
 * Processes changes to the DOM
 * @param pageConfiguration
 */
async function handleElementChange(pageConfiguration: SiteConfiguration) {
    const adElement = document.querySelector(pageConfiguration.adDetectorSelector) as HTMLElement;

    const tabId = await getCurrentTabId();
    const inMutedList = await isTabIdInMutedList(tabId);
    const muted = await isCurrentTabMuted();

    if (adElement) {
        if (!inMutedList && !muted) {
            setTabMuteState(tabId, true);
            addTabToMutedList(tabId);
            
            console.info('Ad Gagger: Ad detected. Muted.', adElement);
        }
    } else {
        if (inMutedList && muted) {
            setTabMuteState(tabId, false);
            removeTabFromMutedList(tabId);
            
            console.info('Ad Gagger: Ad no longer detected. Unmuted.');
        }
    }
}

function conditionallyMuteTab(tabId: number, inMutedList: boolean, muted: boolean): boolean {
    if (!inMutedList && !muted) {
        setTabMuteState(tabId, true);
        addTabToMutedList(tabId);

        console.info('Ad Gagger: Ad detected. Muted.');

        return true;
    }
    return false;
}

function conditionallyUnmuteTab(tabId: number, inMutedList: boolean, muted: boolean): boolean {
    if (inMutedList && muted) {
        setTabMuteState(tabId, false);
        removeTabFromMutedList(tabId);

        console.info('Ad Gagger: Ad no longer detected. Unmuted.');

        return true;
    }
    return false;
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
//         console.info('Ad Gagger: Skip button detected. Skipping ad.');

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
    const savedSettings = await retrieveSavedSettings();
    // const savedSettings: Settings | null = null;

    if (savedSettings === null) {
        console.error('Ad Gagger: No saved settings found, using default settings');
    }

    return savedSettings || defaultSettings;
}

function waitForElement(
    selector: string,
    onDisappear: (element: Element) => void,
    root: Document | Element = document
): Promise<Element> {
    return new Promise((resolve) => {
        // Check if the element already exists
        const element: Element | null = root.querySelector(selector);
        if (element) {
            resolve(element);
            // Set up observer to detect disappearance
            const observer = new MutationObserver(() => {
                if (!root.querySelector(selector)) {
                    observer.disconnect();
                    onDisappear(element);
                }
            });
            observer.observe(root, {
                childList: true,
                subtree: true,
            });
            return;
        }

        // Set up observer to detect appearance
        const observer = new MutationObserver(() => {
            const targetElement: Element | null = root.querySelector(selector);
            if (targetElement) {
                resolve(targetElement);
                // Transition to observing for disappearance
                observer.disconnect();
                const disappearObserver = new MutationObserver(() => {
                    if (!root.querySelector(selector)) {
                        disappearObserver.disconnect();
                        onDisappear(targetElement);
                    }
                });
                disappearObserver.observe(root, {
                    childList: true,
                    subtree: true,
                });
            }
        });

        observer.observe(root, {
            childList: true,
            subtree: true,
        });
    });
}


const init = async () => {
    // Keep track of whether we have simulated a skip button click so that it does not lock up the browser from too many mutations
    // let didClickSkipButton = false;
    
    const settings = await getSettings();
    const pageConfiguration = getSiteConfiguration(settings.siteConfigurations, window.location.href);

    const tabId = await getCurrentTabId();
    const inMutedList = await isTabIdInMutedList(tabId);
    const muted = await isCurrentTabMuted();

    syncTabMuteStateWithStorage();

    if (pageConfiguration) {

        // check if ad element already exists
        const adElement = document.querySelector(
            pageConfiguration.adDetectorSelector
        ) as HTMLElement;

        const adObserver = new MutationObserver(
            createDebouncedHandler(100, () => {
                handleElementChange(siteConfiguration);
            })
        );

        // Use the adContainerSelector if it exists, otherwise use the body
        const adContainerSelector =
            document.querySelector(siteConfiguration.adContainerSelector) ||
            document.body;

        console.info('Ad Gagger: adContainerSelector', adContainerSelector);
        console.info(
            'Ad Gagger: adDetectionElementSelector',
            siteConfiguration.adDetectorSelector
        );

        adObserver.observe(adContainerSelector, {
            childList: true, // Watch for changes in direct children
            subtree: true, // Watch for changes in all descendants
            attributes: true, // Watch for attribute changes
        });

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
        handleElementChange(siteConfiguration);

    }

    // Listen for settings updates from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'CONFIGURATION_UPDATED') {
            init();
        }
    });
};

window.addEventListener('load', init);
