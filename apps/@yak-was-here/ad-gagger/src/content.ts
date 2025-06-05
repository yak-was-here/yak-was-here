type SiteConfiguration = {
    uriMatcher: string;
    adSelector: string;
    parentToAdSelector: string;
};

// All possible site configurations
const siteConfigurations: SiteConfiguration[] = [
    {
        uriMatcher: 'https://www.twitch.tv/*',
        adSelector: '[aria-label="Ad"]',
        parentToAdSelector: '[data-a-target="player-above-the-fold"]',
    },
];

function convertMatchPatternToRegExp(pattern: string): RegExp {
    return new RegExp(
        '^' + pattern.replace(/\*/g, '.*').replace(/[.]/g, '\\.') + '$'
    );
}

/**
 * Set site settings based on current URL
 * @returns
 */
function setSiteSettings(): SiteConfiguration | null {
    const currentUrl = window.location.href;

    for (const siteConfiguration of siteConfigurations) {
        if (
            convertMatchPatternToRegExp(siteConfiguration.uriMatcher).test(
                currentUrl
            )
        ) {
            return siteConfiguration;
        }
    }

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
    const element = checkForElement(siteSettings.adSelector);

    // Element was added
    if (element && !tabMuted) {
        tabMuted = true;
        console.log('Ad Gagger: Target element added', element);
        chrome.runtime.sendMessage({ action: 'mute' });
    }
    // Element was removed
    else if (!element && tabMuted) {
        tabMuted = false;
        console.log('Ad Gagger: Target element removed', element);
        chrome.runtime.sendMessage({ action: 'unmute' });
    }
}

// Keep track of tab mute state
let tabMuted = false;

window.addEventListener('load', () => {
    const siteSettings: SiteConfiguration | null = setSiteSettings();

    if (!siteSettings) {
        console.error('Ad Gagger: No site settings found');
    } else {
        console.log('Ad Gagger: Site settings', siteSettings);
    }

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
