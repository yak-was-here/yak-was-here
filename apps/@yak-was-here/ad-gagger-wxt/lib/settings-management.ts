import { defaultSettings, Settings, StorageData, StorageKeys } from '@/types/settings';
import { SiteConfiguration } from '@/types/configurations';

/**
 * Retrieve settings first from storage if they exists otherwise fallback to default settings
 * @returns Settings
 */
export function retrieveSettings(): Settings {
    console.log('Retrieving settings...')
    // const savedSettings = await retrieveSettingsFromStorage();
    const savedSettings: Settings | null = null;

    if (savedSettings === null) {
        console.warn('Using default settings.')
        return defaultSettings;
    } else {
        return savedSettings;
    }
}

/**
 * Select site configuration from settings based on current URL
 * @param settings
 * @param currentURL
 * @returns
 */
export function getSiteConfigurationFromSettings(
    settings: Settings,
    currentURL: string
): SiteConfiguration | null {
    for (const siteConfiguration of settings.siteConfigurations) {
        if (new MatchPattern(siteConfiguration.match_string).includes(currentURL)) {
            return siteConfiguration;
        }
    }
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
        typeof (obj as unknown as SiteConfiguration).enabled === 'boolean' &&
        'domain' in obj &&
        typeof (obj as unknown as SiteConfiguration).match_string === 'string' &&
        'adSelector' in obj &&
        typeof (obj as unknown as SiteConfiguration).adSelector === 'string' &&
        'adContainerSelector' in obj &&
        (typeof (obj as unknown as SiteConfiguration).adContainerSelector ===
            'string' ||
            (obj as unknown as SiteConfiguration).adContainerSelector ===
                null) &&
        'adCloseButtonSelector' in obj &&
        (typeof (obj as unknown as SiteConfiguration).adCloseButtonSelector ===
            'string' ||
            (obj as unknown as SiteConfiguration).adCloseButtonSelector ===
                null)
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
 * Retrieve settings from sync storage or return null
 * @returns Settings | null
 */
async function retrieveSettingsFromStorage(): Promise<Settings | null> {
    try {
        const storedData = await browser.storage.sync.get(StorageKeys.Settings);
        // const storedConfig = storedData[StorageKeys.Configuration];

        if (isSettingsData(storedData)) {
            return storedData;
        } else {
            console.error('Stored configuration is invalid', storedData);
            await clearSavedSettings();
            return null;
        }
    } catch (error) {
        console.error('Error retrieving configuration', error);
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
        await browser.storage.sync.remove(StorageKeys.Settings.toString());
        return true;
    } catch (error) {
        console.error('Error clearing settings', error);
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
            'Invalid settings format could not be saved'
        );
        return false;
    }

    try {
        await browser.storage.sync.set({
            [StorageKeys.Settings]: config,
        });
        return true;
    } catch (error) {
        console.error('Error saving settings', error);
        return false;
    }
}


export function getStorageValue<K extends StorageKeys>(
    key: K
): Promise<StorageData[K] | undefined> {
    return browser.storage.local.get(key).then(result => result[key]);
}

export function setStorageValue<K extends StorageKeys>(
    key: K, 
    value: StorageData[K]
): Promise<void> {
    return browser.storage.local.set({ [key]: value });
}
