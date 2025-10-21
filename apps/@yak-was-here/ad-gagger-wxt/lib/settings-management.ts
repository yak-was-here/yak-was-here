import {
    defaultSettings,
    defaultSiteConfigurations,
    Settings,
} from '@/types/settings';
import { settingsStorage, StorageTypes } from './storage-management';
import { StorageKeys } from './storage-management';
import { SiteConfiguration } from '@/types/configurations';

/**
 * Get valid settings starting first with what was passed in (usually a new storage value), second from storage directly, or lastly fallback to default settings
 * @param settings - if there are settings to use attempt to use them
 * @returns Settings from storage or default settings
 */
export const getSettings = async (settings?: Settings | null) => {
    console.log('Retrieving settings...');

    const savedSettings = settings ?? await retrieveSettingsFromStorage();

    if (savedSettings === null) {
        console.warn('Using default settings.');
        return defaultSettings;
    }

    return validateSettings(savedSettings);
}

/**
 * Get site configuration(s) from settings for the passed URL
 * @param settings
 * @param url
 * @returns - an array of matching site configurations
 */
export function getSiteConfigurationsForURL(
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
    const settings = await settingsStorage.getValue();

    const meta = await settingsStorage.getMeta();
    const lastModified =
        meta['lastModified'] && typeof meta['lastModified'] === 'number'
            ? meta['lastModified']
            : 0;

    if (settings !== null) {
        const lastModifiedDate = new Date(lastModified).toLocaleString();

        console.log(`Successfully retrieved settings from storage. Last modified: `, lastModifiedDate);
    }

    return settings;
}

/**
 * Clear saved settings
 * @returns
 */
export async function clearSavedSettings() {
    await settingsStorage.removeValue();
    await settingsStorage.removeMeta();
    console.warn(`Cleared stored settings.`);
}

/**
 * Save settings
 */
export async function saveSettings(userSettings: Settings) {

    const validatedSettings = validateSettings(userSettings);

    await settingsStorage.setValue(validatedSettings);

    await settingsStorage.setMeta({
        lastModified: Date.now()
    });

    console.log(`Saved settings.`, validatedSettings);
}

/**
 * Validate settings - merges default settings with user settings and returns validated settings
 */
export const validateSettings = (userSettings: Settings): Settings => {
    const validatedSettings = JSON.parse(JSON.stringify(userSettings)) as Settings;

    // Collect default site configurations' enabled state from user settings
    const defaultSiteConfigs_UserEnabledSettings = new Map<string, boolean>(
        validatedSettings.siteConfigurations
            .filter(userSiteConfig => {
                return defaultSiteConfigurations.find(defaultSiteConfig => defaultSiteConfig.id === userSiteConfig.id)
            })
            .map(c => [c.id, c.enabled] as [string, boolean])
    );

    // Only preserve the enabled state from user settings
    // and merge them with the values for the default site configurations
    const defaultSiteConfigs_WithUserEnabledSettings: SiteConfiguration[] = defaultSiteConfigurations.map((defaultSiteCfg) => {
        const clonedDefaultSiteCfg = JSON.parse(JSON.stringify(defaultSiteCfg)) as SiteConfiguration;
        const overrideEnabled = defaultSiteConfigs_UserEnabledSettings.get(defaultSiteCfg.id);
        if (typeof overrideEnabled === 'boolean') {
            clonedDefaultSiteCfg.enabled = overrideEnabled;
        }
        return clonedDefaultSiteCfg;
    });

    // User created site configurations
    const userCreatedSitConfigs: SiteConfiguration[] = validatedSettings.siteConfigurations.filter((cfg) => {
        const isDefaultId = defaultSiteConfigurations.find((c) => c.id === cfg.id);
        return cfg.isUserCreated && !isDefaultId;
    });

    validatedSettings.siteConfigurations = [...defaultSiteConfigs_WithUserEnabledSettings, ...userCreatedSitConfigs];

    return validatedSettings;
}
