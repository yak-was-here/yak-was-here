/**
 * @property {string} uriMatcher - The URI matcher for the site this configuration applies to
 * @property {string} adDetectionElementSelector - The selector for the element that indicates an ad is playing
 * @property {string} parentToAdSelector - The selector for the parent element that contains the ad; this is used to minimize the number of elements that need to be watched for changes
 * @property {KeyboardEvent['key'][]} muteKeyBind - The key bind to mute the player containing the ad; each string in the array represents a key to press
 * @property {KeyboardEvent['key'][]} unmuteKeyBind - The key bind to unmute the player containing the ad; each string in the array represents a key to press
 */
type SiteConfiguration = {
    uriMatcher: string;
    adDetectionElementSelector: string;
    parentToAdSelector: string;
    muteKeyBind: KeyboardEvent['key'][];
    unmuteKeyBind: KeyboardEvent['key'][];
};

// All possible site configurations
const siteConfigurations: SiteConfiguration[] = [
    {
        uriMatcher: 'https://www.twitch.tv/',
        adDetectionElementSelector: '[aria-label="Ad"]',
        parentToAdSelector: 'button[aria-label="Leave feedback for this Ad"]',
        muteKeyBind: ['M'],
        unmuteKeyBind: ['M'],
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
            console.log(
                'Ad Gagger: Site configuration found',
                siteConfiguration
            );
            return siteConfiguration;
        }
    }

    console.log('Ad Gagger: No site configuration found');
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

    // Element was added
    if (element && !didMutedAd) {
        didMutedAd = true;
        console.log('Ad Gagger: Target element added', element);
        chrome.runtime.sendMessage({ action: 'mute' });
    }
    // Element was removed
    else if (!element && didMutedAd) {
        didMutedAd = false;
        console.log('Ad Gagger: Target element removed', element);
        chrome.runtime.sendMessage({ action: 'unmute' });
    }
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
