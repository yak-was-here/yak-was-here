import { Settings, SiteConfiguration, StorageData, StorageKeys } from '../types';

/**
 * Select site settings based on current URL and site configurations
 * @param siteConfigurations
 * @param currentURL
 * @returns
 */
export function getSiteConfiguration(
    siteConfigurations: SiteConfiguration[],
    currentURL: string
): SiteConfiguration | null {
    for (const siteConfiguration of siteConfigurations) {
        if (urlBelongsToDomain(siteConfiguration.domain, currentURL)) {
            return siteConfiguration;
        }
    }
    return null;
}

/**
 * Checks if a given URL belongs to the specified domain.
 * Ignores cases where the domain appears as a query parameter value.
 * 
 * @param domain - The domain to check against (e.g., "example.com")
 * @param currentUrl - The URL to test (e.g., "https://example.com/path")
 * @returns true if the URL belongs to the domain, false otherwise
 */
export function urlBelongsToDomain(domain: string, currentUrl: string): boolean {
    if (!domain || !currentUrl) {
        return false;
    }

    try {
        const url = new URL(currentUrl);
        const hostname = url.hostname;
        
        // Escape special regex characters in the domain
        const escapedDomain = domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Create regex pattern that matches the domain at the end of hostname
        // This handles both exact matches and subdomains
        // ^(.+\.)?domain\.com$ - matches example.com, sub.example.com, but not fakeexample.com
        const domainPattern = new RegExp(`^(.+\\.)?${escapedDomain}$`, 'i');
        
        return domainPattern.test(hostname);
    } catch {
        // Invalid URL format
        return false;
    }
}

/**
 * Compares two URLs to check if they have the same hostname. 
 * Example: 
 * `urlsHaveSameDomain("https://sub.example.com/page1", "https://example.com/page2") // false (different hostnames)`
 * 
 * @param url1 - The first URL to compare (e.g., "https://example.com/path1")
 * @param url2 - The second URL to compare (e.g., "https://example.com/path2")
 * @returns true if both URLs have the same hostname, false otherwise
 */
export function urlsHaveSameHostname(url1: string, url2: string): boolean {
    if (!url1 || !url2) {
        return false;
    }

    try {
        const parsedUrl1 = new URL(url1);
        const parsedUrl2 = new URL(url2);
        
        return parsedUrl1.hostname.toLowerCase() === parsedUrl2.hostname.toLowerCase();
    } catch {
        // Invalid URL format
        return false;
    }
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
        'domain' in obj &&
        typeof (obj as SiteConfiguration).domain === 'string' &&
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


export function getStorageValue<K extends StorageKeys>(
    key: K
): Promise<StorageData[K] | undefined> {
    return chrome.storage.local.get(key).then(result => result[key]);
}

export function setStorageValue<K extends StorageKeys>(
    key: K, 
    value: StorageData[K]
): Promise<void> {
    return chrome.storage.local.set({ [key]: value });
}
