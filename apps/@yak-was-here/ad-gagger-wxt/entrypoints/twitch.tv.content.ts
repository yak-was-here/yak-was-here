import { Settings } from '@/types/settings';
import {
    getSiteConfigurationFromSettings,
    retrieveSettings,
} from '@/lib/settings-management';
import {
    retrieveCurrentTabId,
    unmuteTabConditionally,
} from '@/lib/tab-management';
import { waitForElementAppearance } from '@/lib/observer-management';

const MATCH_STRING = '*://*.twitch.tv/*';

export default defineContentScript({
    matches: [MATCH_STRING],
    async main(ctx) {
        const observersArr: MutationObserver[] = [];

        const settings = await initialize();
        startDetection(settings, window.location.href, observersArr);

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

                    await stopDetection(observersArr);
                    startDetection(
                        settings,
                        window.location.href,
                        observersArr
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
 * Start detection
 * @param settings - extension settings
 * @param currentUrl - URL to match against
 * @param observersArr - an array to store observers in
 */
const startDetection = async (
    settings: Settings,
    currentUrl: string,
    observersArr: MutationObserver[]
) => {
    console.log(`Starting detection...`);

    if (!settings) {
        console.error(
            'Could not start detection because no settings were found!'
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

    const tabId = await retrieveCurrentTabId();;

    for (const elementConfig of siteConfiguration.elementConfigurations) {
        waitForElementAppearance(
            observersArr,
            elementConfig,
            tabId
        );
    };
};

/**
 * Stop detection: unmutes the tab if it was muted by the extension and clean up any observers
 */
const stopDetection = async (observersArr: MutationObserver[]) => {
    console.log(`Stopping detection...`);

    await unmuteTabConditionally(await retrieveCurrentTabId());
    cleanUpObservers(observersArr);
};
