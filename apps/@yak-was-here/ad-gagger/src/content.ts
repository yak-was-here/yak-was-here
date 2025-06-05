import { SiteConfiguration } from './types';
import { MuteMethod, StorageKeys } from './types';

// All possible site configurations
const siteConfigurations: SiteConfiguration[] = [
    {
        uriMatcher: 'https://www.twitch.tv/',
        adDetectionElementSelector: '[data-a-target="video-ad-label"]',
        muteKeyBind: ['m'],
        unmuteKeyBind: ['m'],
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

// ! In the future, we could just mute the player elements directly instead by sending the mute/unmute key binds to the tab
async function sendKeysToPage(keys: KeyboardEvent['key'][]) {
    // Press all keys down in order
    for (const key of keys) {
        const keydownEvent = new KeyboardEvent('keydown', {
            key: key,
            bubbles: true,
            cancelable: true,
        });
        document.dispatchEvent(keydownEvent);
        await new Promise((resolve) => setTimeout(resolve, 50)); // Optional delay between key presses
    }

    // Release all keys in reverse order
    for (const key of [...keys].reverse()) {
        const keyupEvent = new KeyboardEvent('keyup', {
            key: key,
            bubbles: true,
            cancelable: true,
        });
        document.dispatchEvent(keyupEvent);
        await new Promise((resolve) => setTimeout(resolve, 50)); // Optional delay between key releases
    }
}

/**
 * Processes changes to the DOM
 * @param siteSettings
 */
function handleElementChange(siteSettings: SiteConfiguration) {
    const element = checkForElement(siteSettings.adDetectionElementSelector);

    chrome.storage.sync.get([StorageKeys.MuteMethod], async (result) => {
        const muteMethod: MuteMethod = result.muteMethod || MuteMethod.Tab;

        // Element was added
        if (element && !didMutedAd) {
            didMutedAd = true;
            console.info('Ad Gagger: Ad element detected', element);
            if (muteMethod === MuteMethod.Tab) {
                chrome.runtime.sendMessage({ action: 'mute' });
            } else {
                await sendKeysToPage(siteSettings.muteKeyBind);
            }
        }
        // Element was removed
        else if (!element && didMutedAd) {
            didMutedAd = false;
            console.info('Ad Gagger: Ad element no longer detected');
            if (muteMethod === MuteMethod.Tab) {
                chrome.runtime.sendMessage({ action: 'unmute' });
            } else {
                await sendKeysToPage(siteSettings.unmuteKeyBind);
            }
        }
    });
}

// Keep track of whether the extension has already muted the tab, this way the user can unmute the tab manually if they want to listen to ads
let didMutedAd = false;

window.addEventListener('load', () => {
    const siteSettings: SiteConfiguration | null = setSiteSettings();

    if (siteSettings) {
        const observer = new MutationObserver(() => {
            handleElementChange(siteSettings);
        });

        observer.observe(document.body, {
            childList: true, // Watch for changes in direct children
            subtree: true, // Watch for changes in all descendants
            attributes: true, // Watch for attribute changes
        });

        // Initial check
        handleElementChange(siteSettings);
    }
});
