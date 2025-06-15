import { Configuration, SiteConfiguration, StorageKeys } from '../types';

/**
 * Select site settings based on current URL and site configurations
 * @param siteConfigurations
 * @param currentUrl
 * @returns
 */
export function selectSiteSettings(
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
        'adDetectorSelector' in obj &&
        typeof (obj as SiteConfiguration).adDetectorSelector === 'string' &&
        'adContainerSelector' in obj &&
        (typeof (obj as SiteConfiguration).adContainerSelector === 'string' ||
            (obj as SiteConfiguration).adContainerSelector === null) &&
        'adCloseButtonSelector' in obj &&
        (typeof (obj as SiteConfiguration).adCloseButtonSelector === 'string' ||
            (obj as SiteConfiguration).adCloseButtonSelector === null)
    );
}

/**
 * Type guard to check if an object is a `Configuration`
 */
function isConfiguration(obj: unknown): obj is Configuration {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        'siteConfigurations' in obj &&
        Array.isArray((obj as Configuration).siteConfigurations) &&
        (obj as Configuration).siteConfigurations.every(isSiteConfiguration)
    );
}

export async function retrieveSavedConfiguration(): Promise<Configuration | null> {
    try {
        const storedData = await chrome.storage.sync.get(
            StorageKeys.Configuration
        );
        // const storedConfig = storedData[StorageKeys.Configuration];

        if (isConfiguration(storedData)) {
            return storedData;
        } else {
            console.warn(
                'Ad Gagger: Stored configuration is invalid',
                storedData
            );
            await clearSavedConfiguration();
            return null;
        }
    } catch (error) {
        console.error('Ad Gagger: Error retrieving configuration', error);
        await clearSavedConfiguration();
        return null;
    }
}

/**
 * Clear saved configuration
 * @returns
 */
export async function clearSavedConfiguration(): Promise<boolean> {
    try {
        console.info('Ad Gagger: Clearing configuration');
        await chrome.storage.sync.remove(StorageKeys.Configuration.toString());
        return true;
    } catch (error) {
        console.error('Ad Gagger: Error clearing configuration', error);
        return false;
    }
}

/**
 * Save configuration after validating it
 */
export async function saveConfiguration(
    config: Configuration
): Promise<boolean> {
    if (!isConfiguration(config)) {
        console.error(
            'Ad Gagger: Invalid configuration format could not be saved'
        );
        return false;
    }

    try {
        await chrome.storage.sync.set({
            [StorageKeys.Configuration]: config,
        });
        console.info('Ad Gagger: Configuration saved successfully');
        return true;
    } catch (error) {
        console.error('Ad Gagger: Error saving configuration', error);
        return false;
    }
}
