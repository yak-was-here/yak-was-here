import { Settings, SiteConfiguration, StorageKeys } from '../types';

/**
 * Select site settings based on current URL and site configurations
 * @param siteConfigurations
 * @param currentUrl
 * @returns
 */
export function getSiteConfiguration(
    siteConfigurations: SiteConfiguration[],
    currentUrl: string
): SiteConfiguration | null {
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
 * Type guard to check if an object is a `SiteConfiguration`
 */
function isSiteConfiguration(obj: unknown): obj is SiteConfiguration {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        'active' in obj &&
        typeof (obj as SiteConfiguration).active === 'boolean' &&
        'uriMatcher' in obj &&
        typeof (obj as SiteConfiguration).uriMatcher === 'string' &&
        'adSelector' in obj &&
        typeof (obj as SiteConfiguration).adSelector === 'string' &&
        'adContainerSelector' in obj &&
        (typeof (obj as SiteConfiguration).adContainerSelector === 'string' ||
            (obj as SiteConfiguration).adContainerSelector === null) &&
        'adCloseButtonSelector' in obj &&
        (typeof (obj as SiteConfiguration).adCloseButtonSelector === 'string' ||
            (obj as SiteConfiguration).adCloseButtonSelector === null)
    );
}

/**
 * Type guard to check if an object is a `Settings`
 */
function isSettingsData(obj: unknown): obj is Settings {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        'siteConfigurations' in obj &&
        Array.isArray((obj as Settings).siteConfigurations) &&
        (obj as Settings).siteConfigurations.every(isSiteConfiguration)
    );
}

/**
 * Retrieve saved settings from sync storage
 * @returns Settings | null
 */
export async function retrieveSavedSettings(): Promise<Settings | null> {
    try {
        const storedData = await chrome.storage.sync.get(
            StorageKeys.Settings
        );
        // const storedConfig = storedData[StorageKeys.Configuration];

        if (isSettingsData(storedData)) {
            return storedData;
        } else {
            console.warn(
                'Ad Gagger: Stored configuration is invalid',
                storedData
            );
            await clearSavedSettings();
            return null;
        }
    } catch (error) {
        console.error('Ad Gagger: Error retrieving configuration', error);
        await clearSavedSettings();
        return null;
    }
}

/**
 * Clear saved settings
 * @returns
 */
export async function clearSavedSettings(): Promise<boolean> {
    try {
        console.info('Ad Gagger: Clearing settings');
        await chrome.storage.sync.remove(StorageKeys.Settings.toString());
        return true;
    } catch (error) {
        console.error('Ad Gagger: Error clearing settings', error);
        return false;
    }
}

/**
 * Save settings after validating
 */
export async function saveSettings(
    config: Settings
): Promise<boolean> {
    if (!isSettingsData(config)) {
        console.error(
            'Ad Gagger: Invalid settings format could not be saved'
        );
        return false;
    }

    try {
        await chrome.storage.sync.set({
            [StorageKeys.Settings]: config,
        });
        console.info('Ad Gagger: Settings saved successfully');
        return true;
    } catch (error) {
        console.error('Ad Gagger: Error saving settings', error);
        return false;
    }
}
