import { Settings } from '@/types/settings';
import {
    getSiteConfigurationFromSettings,
    retrieveSettings,
} from '@/lib/settings-management';
import {
    retrieveCurrentTabId,
    unmuteTabConditionally,
} from '@/lib/tab-management';
import { waitForAdStart } from '@/lib/observer-management';

const MATCH_STRING = '*://*.twitch.tv/*';

export default defineContentScript({
    matches: [MATCH_STRING],
    async main(ctx) {
        const adObservers: MutationObserver[] = [];

        const settings = await initialize();
        startAdDetection(settings, window.location.href, adObservers);

        // https://wxt.dev/guide/essentials/content-scripts.html#dealing-with-spas
        // Technically we may not need to do this because we are only handling on a per domain basis.
        ctx.addEventListener(
            window,
            'wxt:locationchange',
            async ({ oldUrl, newUrl }) => {
                if (new MatchPattern(MATCH_STRING).includes(newUrl)) {
                    console.log(
                        `Detected location change:\n${oldUrl} ➡️ ${newUrl}`
                    );

                    await stopAdDetection(adObservers);
                    startAdDetection(
                        settings,
                        window.location.href,
                        adObservers
                    );
                }
            }
        );
    },
});

/**
 * Initialize: reset tab state and retrieve settings
 * @returns settings
 */
const initialize = async (): Promise<Settings> => {
    console.log('Initializing...');

    await unmuteTabConditionally(await retrieveCurrentTabId());

    return await retrieveSettings();
};

/**
 * Start ad detection
 * @param settings - extension settings
 * @param currentUrl - URL to match against
 * @param adObservers - an array to store ad observers in
 */
const startAdDetection = async (
    settings: Settings,
    currentUrl: string,
    adObservers: MutationObserver[]
) => {
    console.log(`Starting ad detection...`);

    if (!settings) {
        console.error(
            'Could not start ad detection because no settings were found!'
        );
        return;
    }

    const siteConfiguration = getSiteConfigurationFromSettings(
        settings,
        currentUrl
    );

    if (!siteConfiguration) {
        console.log(`No site configuration found for: `, currentUrl);
        return;
    }

    if (siteConfiguration && !siteConfiguration.enabled) {
        console.log('Site configuration found but it is not active.');
        return;
    }

    const adContainer =
        (siteConfiguration.adContainerSelector &&
            document.querySelector(siteConfiguration.adContainerSelector)) ||
        document;

    waitForAdStart(
        adObservers,
        adContainer,
        siteConfiguration,
        await retrieveCurrentTabId()
    );
};

/**
 * Stop ad detection: unmutes the tab if it was muted by the extension and clean up any observers
 */
const stopAdDetection = async (adObservers: MutationObserver[]) => {
    console.log(`Stopping ad detection...`);

    await unmuteTabConditionally(await retrieveCurrentTabId());
    cleanUpObservers(adObservers);
};
