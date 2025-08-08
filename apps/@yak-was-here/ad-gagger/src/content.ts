import {
    addTabToMutedList,
    getCurrentTabId,
    isTabIdInMutedList,
    isCurrentTabMuted,
    removeTabFromMutedList,
    selectSiteSettings,
    setTabMuteState,
    syncTabMuteStateWithStorage,
    retrieveSavedSettings,
} from './lib';
import { Settings, defaultSettings, SiteConfiguration, StorageKeys } from './types';

/**
 *  ! This should only be called when the parent of the ad detector selector changes and it should be debounced
 * Processes changes to the DOM
 * @param siteSettings
 */
async function handleElementChange(siteSettings: SiteConfiguration) {
    const adElement = document.querySelector(siteSettings.adDetectorSelector) as HTMLElement;

    const tabId = await getCurrentTabId();
    const inMutedList = await isTabIdInMutedList(tabId);
    const muted = await isCurrentTabMuted();

    if (adElement) {
        if (!inMutedList && !muted) {
            console.info('Ad Gagger: Ad detected. Muting.', adElement);

            setTabMuteState(tabId, true);
            addTabToMutedList(tabId);
        }
    } else {
        if (inMutedList && muted) {
            console.info('Ad Gagger: Ad no longer detected. Unmuting.');

            setTabMuteState(tabId, false);
            removeTabFromMutedList(tabId);
        }
    }
}

function handleSkipButtonChange(siteSettings: SiteConfiguration) {
    const skipButton = document.querySelector(siteSettings.adCloseButtonSelector) as HTMLButtonElement;
    console.log('Ad Gagger: skipButton', skipButton);
    console.log('Ad Gagger: didClickSkipButton', didClickSkipButton);

    if (
        !didClickSkipButton &&
        skipButton &&
        skipButton.offsetParent !== null &&
        !skipButton.disabled
    ) {
        console.info('Ad Gagger: Skip button detected. Skipping ad.');

        try {
            // Try direct click first
            skipButton.click();

            // // If that doesn't work, try simulating a full mouse click sequence
            // skipButton.dispatchEvent(
            //     new MouseEvent('mouseover', {
            //         view: window,
            //         bubbles: true,
            //         cancelable: true,
            //     })
            // );

            // skipButton.dispatchEvent(
            //     new MouseEvent('mousedown', {
            //         view: window,
            //         bubbles: true,
            //         cancelable: true,
            //     })
            // );

            // skipButton.dispatchEvent(
            //     new MouseEvent('mouseup', {
            //         view: window,
            //         bubbles: true,
            //         cancelable: true,
            //     })
            // );

            // skipButton.dispatchEvent(
            //     new MouseEvent('click', {
            //         view: window,
            //         bubbles: true,
            //         cancelable: true,
            //     })
            // );

            didClickSkipButton = true;
        } catch (e) {
            console.error('Ad Gagger: Error skipping ad', e);
        }
    }

    console.log('Ad Gagger: didClickSkipButton', didClickSkipButton);

    setTimeout(() => {
        didClickSkipButton = false;
        console.log('Ad Gagger: didClickSkipButton', didClickSkipButton);
    }, 5000);
}

// Keep track of whether we have simulated a skip button click so that it does not lock up the browser from too many mutations
let didClickSkipButton = false;

function createDebouncedHandler(wait: number, handler: () => void): () => void {
    let timeout: number;

    return () => {
        // Clear any existing timeout
        window.clearTimeout(timeout);

        // Set new timeout
        timeout = window.setTimeout(handler, wait);
    };
}

const init = async () => {
    // Load settings from storage
    const savedSettings: Settings = await retrieveSavedSettings();

    // Set site configurations from saved settings or fallback to default settings
    const siteConfigurations: SiteConfiguration[] =
        savedSettings.siteConfigurations ||
        defaultSettings.siteConfigurations;

    //
    const siteConfiguration: SiteConfiguration | null = selectSiteSettings(
        siteConfigurations,
        window.location.href
    );

    if (siteConfiguration) {
        await syncTabMuteStateWithStorage();

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
};

window.addEventListener('load', init);

// Listen for configuration updates from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CONFIGURATION_UPDATED') {
        siteConfigurations = message.configurations;
        // Reinitialize with new configurations
        init();
    }
});
