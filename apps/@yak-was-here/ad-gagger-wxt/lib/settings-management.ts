import { storage } from '#imports';
import {
    defaultSettings,
    Settings,
    StorageData,
    StorageKeys,
} from '@/types/settings';
import { SiteConfiguration } from '@/types/configurations';

/**
 * Retrieve and return valid settings starting first with what was passed in (usually a new storage value), second from storage directly, or lastly fallback to default settings
 * @param settings - if there are settings to use attempt to use them
 * @returns Settings from storage or default settings
 */
export const retrieveSettings = async (settings?: Settings | null) => {
    console.log('Retrieving settings...');

    const savedSettings = settings ?? await retrieveSettingsFromStorage();

    if (savedSettings === null) {
        console.warn('Using default settings.');
        return defaultSettings;
    }
    return savedSettings;
}

/**
 * Get site configuration(s) from settings based on the passed URL
 * @param settings
 * @param url
 * @returns - an array of matching site configurations
 */
export function getSiteConfigurationFromSettings(
    settings: Settings,
    url: string
): SiteConfiguration[] {
    const matchingConfigs: SiteConfiguration[] = [];
    for (const siteConfiguration of settings.siteConfigurations) {
        if (
            new MatchPattern(siteConfiguration.matchString).includes(
                url
            )
        ) {
            matchingConfigs.push(siteConfiguration);
        }
    }
    return matchingConfigs;
}

/**
 * Retrieve settings from sync storage or return null
 * @returns Settings | null
 */
async function retrieveSettingsFromStorage(): Promise<Settings | null> {
    const settings = await storage.getItem<Settings>(StorageKeys.Settings);
    
    const meta = await storage.getMeta(StorageKeys.Settings);
    const lastModified =
        meta['lastModified'] && typeof meta['lastModified'] === 'number'
            ? meta['lastModified']
            : 0;
    
    if (settings !== null) {
        console.log(`Successfully retrieved settings from storage. Last modified: `, lastModified);
    }

    return settings;
}

/**
 * Clear saved settings
 * @returns
 */
export async function clearSavedSettings() {
    console.warn(`Clearing stored settings.`);
    await storage.removeItem(StorageKeys.Settings);
}

/**
 * Save settings
 */
export async function saveSettings(settings: Settings) {
    console.log(`Saving settings.`, settings);
    
    await storage.setItem<Settings>(StorageKeys.Settings, settings);

    await storage.setMeta(StorageKeys.Settings, { lastModified: Date.now() });
}

export function getStorageValue<K extends StorageKeys>(
    key: K
): Promise<StorageData[K] | undefined> {
    return browser.storage.local.get(key).then((result) => result[key]);
}

export function setStorageValue<K extends StorageKeys>(
    key: K,
    value: StorageData[K]
): Promise<void> {
    return browser.storage.local.set({ [key]: value });
}
