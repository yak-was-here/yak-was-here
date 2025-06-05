import { SiteConfiguration } from './types';
import { MuteMethod, StorageKeys } from './types';

// All possible site configurations
const siteConfigurations: SiteConfiguration[] = [
    {
        uriMatcher: 'https://www.twitch.tv/',
        adDetectionElementSelector: '[data-a-target="video-ad-label"]',
        adSkipButtonSelector: null,
        adContainerSelector: null,
    },
    {
        uriMatcher: 'https://www.youtube.com/',
        adDetectionElementSelector: 'div.html5-video-player.ad-showing',
        adSkipButtonSelector:
            '.ytp-ad-skip-button-container:not([style*="display: none"]) .ytp-ad-skip-button',
        adContainerSelector: '#container',
    },
];

/**
 * Set site settings based on current URL
 * @returns
 */
function setSiteSettings(): SiteConfiguration | null {
    const currentUrl = window.location.href;

    for (const siteConfiguration of siteConfigurations) {
        if (currentUrl.startsWith(siteConfiguration.uriMatcher)) {
            console.info(
                'Ad Gagger: Site configuration found',
                siteConfiguration
            );
            return siteConfiguration;
        }
    }

    console.info('Ad Gagger: No site configuration found');
    return null;
}

/**
 * Checks if a DOM element exists
 * @param selector
 * @returns
 */
function checkForElement(selector: string): Element | null {
    return document.querySelector(selector);
}

/**
 * Processes changes to the DOM
 * @param siteSettings
 */
function handleElementChange(siteSettings: SiteConfiguration) {
    const element = checkForElement(siteSettings.adDetectionElementSelector);

    chrome.storage.sync.get([StorageKeys.MuteMethod], async (result) => {
        const muteMethod: MuteMethod = result.muteMethod || MuteMethod.Gag;

        // Element was added
        if (element && !didMuteTab) {
            didMuteTab = true;
            console.info('Ad Gagger: Ad element detected', element);
            if (muteMethod === MuteMethod.Gag) {
                chrome.runtime.sendMessage({ action: 'mute' });
            } else {
                chrome.runtime.sendMessage({ action: 'mute' });
            }
        }
        // Element was removed
        else if (!element && didMuteTab) {
            didMuteTab = false;
            console.info('Ad Gagger: Ad element no longer detected');
            if (muteMethod === MuteMethod.Gag) {
                chrome.runtime.sendMessage({ action: 'unmute' });
            } else {
                chrome.runtime.sendMessage({ action: 'unmute' });
            }
        }
    });
}

function handleSkipButtonChange(siteSettings: SiteConfiguration) {
    const skipButton = checkForElement(
        siteSettings.adSkipButtonSelector
    ) as HTMLButtonElement;
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

// Keep track of whether the extension has already muted the tab, this way the user can unmute the tab manually if they want to listen to ads
let didMuteTab = false;

// Keep track of whether we have simulated a skip button click so that it does not lock up the browser from too many mutations
let didClickSkipButton = false;

window.addEventListener('load', () => {
    const siteSettings: SiteConfiguration | null = setSiteSettings();

    if (siteSettings) {
        const adObserver = new MutationObserver(() => {
            handleElementChange(siteSettings);
        });

        const adContainerSelector =
            document.querySelector(siteSettings.adContainerSelector) ||
            document.body;

        adObserver.observe(adContainerSelector, {
            childList: true, // Watch for changes in direct children
            subtree: true, // Watch for changes in all descendants
            attributes: true, // Watch for attribute changes
        });

        if (siteSettings.adSkipButtonSelector) {
            const skipButtonObserver = new MutationObserver(() => {
                handleSkipButtonChange(siteSettings);
            });

            skipButtonObserver.observe(adContainerSelector, {
                childList: true, // Watch for changes in direct children
                subtree: true, // Watch for changes in all descendants
                attributes: true, // Watch for attribute changes
            });

            // Initial check
            handleSkipButtonChange(siteSettings);
        }

        // Initial check
        handleElementChange(siteSettings);
    }
});
