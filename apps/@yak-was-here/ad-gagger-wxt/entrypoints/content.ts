import { Settings } from '@/types/settings';
import { settingsStorage } from '@/lib/storage-management';
import {
    getSiteConfigurationsForURL,
    getSettings,
} from '@/lib/settings-management';
import {
    retrieveCurrentTabId,
    unmuteTabConditionally,
} from '@/lib/tab-management';
import { waitForElementAppearance } from '@/lib/observer-management';
import { SiteConfiguration } from '@/types/configurations';
import { hasUrlChanged } from '@/utils/urls';

// This allows users to create configurations for any site/URL
const MATCH_STRING = '<all_urls>';

export default defineContentScript({
    matches: [MATCH_STRING],
    async main(ctx) {

        const observersArr: MutationObserver[] = [];

        const tabId = await retrieveCurrentTabId();
        const settings = await getSettings();
        const urlSiteConfigurations = await initialize(tabId, settings);

        if (urlSiteConfigurations.length > 0) {
            startDetection(urlSiteConfigurations, observersArr, tabId);
        } else {
            console.log(`No site configurations match the current URL.`)
        }

        // Triggered when location changes
        // https://wxt.dev/guide/essentials/content-scripts.html#dealing-with-spas
        ctx.addEventListener(
            window,
            'wxt:locationchange',
            async ({ oldUrl, newUrl }) => {
                if (hasUrlChanged(oldUrl, newUrl)) {
                    console.log(
                        `Detected location change:\n${oldUrl} ➡️ ${newUrl}`
                    );

                    await stopDetection(observersArr, tabId);

                    const updatedUrlSiteConfigurations = await initialize(tabId, settings, newUrl.toString());

                    if (updatedUrlSiteConfigurations.length > 0) {
                        startDetection(
                            updatedUrlSiteConfigurations,
                            observersArr,
                            tabId
                        );
                    } else {
                        console.log(
                            `No site configurations match the current URL.`
                        );
                    }
                }
            }
        );

        settingsStorage.watch(
            async (updatedSettings, outdatedSettings) => {
                console.warn(`Detected settings change.`);

                await stopDetection(observersArr, tabId);

                const validatedSettings = await getSettings(updatedSettings);

                const urlSiteConfigurations = await initialize(tabId, validatedSettings);

                if (urlSiteConfigurations.length > 0) {
                    startDetection(urlSiteConfigurations, observersArr, tabId);
                } else {
                    console.log(
                        `No site configurations match the current URL.`
                    );
                }
            }
        );
    },
});

/**
 * Initialize tab with applicable settings
 * @returns site configurations for the passedUrl
 */
const initialize = async (
    tabId: number,
    settings: Settings,
    passedUrl?: string
): Promise<SiteConfiguration[]> => {
    console.log('Initializing...');

    await unmuteTabConditionally(tabId);

    const url = passedUrl ?? window.location.href;

    const urlSiteConfigurations = getSiteConfigurationsForURL(settings, url);

    return urlSiteConfigurations;
};

/**
 * Start detection
 * @param siteConfigurations - only configuration(s) for this site/URL
 * @param observersArr - an array to store observers in
 * @param tabId - the id of current tab
 */
const startDetection = async (
    siteConfigurations: SiteConfiguration[],
    observersArr: MutationObserver[],
    tabId: number,
) => {
    console.log(`Starting detection...`);

    for (const siteConfiguration of siteConfigurations) {
        if (siteConfiguration.enabled) {
            for (const elementConfig of siteConfiguration.elementConfigurations) {
                waitForElementAppearance(
                    observersArr,
                    elementConfig,
                    tabId
                );
            };
        } else {
            console.log(`Skipping disabled site configuration with matchString: `, siteConfiguration.matchString);
        }

    };

};

/**
 * Stop detection: unmutes the tab if it was muted by the extension and clean up any observers
 */
const stopDetection = async (
    observersArr: MutationObserver[],
    tabId: number
) => {
    console.log(`Stopping detection...`);

    await unmuteTabConditionally(tabId);
    cleanUpObservers(observersArr);
};
