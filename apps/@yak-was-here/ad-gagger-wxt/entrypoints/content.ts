import { Settings } from '@/types/settings';
import { StorageKeys } from '@/lib/storage-management';
import {
    getSiteConfigurationFromSettings as getSiteConfigurationsFromSettings,
    getSettings,
} from '@/lib/settings-management';
import {
    retrieveCurrentTabId,
    unmuteTabConditionally,
} from '@/lib/tab-management';
import { waitForElementAppearance } from '@/lib/observer-management';
import { SiteConfiguration } from '@/types/configurations';
import { hasUrlChanged } from '@/utils/urls';

const MATCH_STRING = '<all_urls>';

export default defineContentScript({
    matches: [MATCH_STRING],
    async main(ctx) {

        const observersArr: MutationObserver[] = [];
        
        const tabId = await retrieveCurrentTabId();
        const settings = await getSettings();
        const siteConfigurations = await initialize(tabId, settings);
        
        if (siteConfigurations.length > 0) {
            startDetection(siteConfigurations, observersArr, tabId);
        } else {
            console.log(`No site configurations match the current URL.`)
        }

        // https://wxt.dev/guide/essentials/content-scripts.html#dealing-with-spas
        // Technically we may not need to do this because we are only handling on a per domain basis.
        ctx.addEventListener(
            window,
            'wxt:locationchange',
            async ({ oldUrl, newUrl }) => {
                if (hasUrlChanged(oldUrl, newUrl)) {
                    console.log(
                        `Detected location change:\n${oldUrl} ➡️ ${newUrl}`
                    );

                    await stopDetection(observersArr, tabId);

                    const updatedSiteConfiguration = await initialize(tabId, settings, newUrl.toString());

                    if (updatedSiteConfiguration.length > 0) {
                        startDetection(
                            updatedSiteConfiguration,
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

        storage.watch<Settings>(
            StorageKeys.Settings,
            async (updatedSettings, outdatedSettings) => {
                console.warn(`Detected settings change.`);

                await stopDetection(observersArr, tabId);

                const validatedSettings = await getSettings(updatedSettings);

                const siteConfigurations = await initialize(tabId, validatedSettings);

                if (siteConfigurations.length > 0) {
                    startDetection(siteConfigurations, observersArr, tabId);
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
 * Initialize: reset tab state and retrieve settings
 * @returns settings
 */
const initialize = async (
    tabId: number,
    settings: Settings,
    passedUrl?: string
): Promise<SiteConfiguration[]> => {
    console.log('Initializing...');

    await unmuteTabConditionally(tabId);

    const url = passedUrl ?? window.location.href;

    const siteConfigurations = getSiteConfigurationsFromSettings(settings, url);

    return siteConfigurations;
};

/**
 * Start detection
 * @param siteConfigurations - configuration(s) for this site/URL
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
