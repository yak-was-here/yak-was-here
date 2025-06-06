import { MuteMethod, SiteConfiguration, StorageKeys } from '../types';

/**
 * Select site settings based on current URL and site configurations
 * @param siteConfigurations 
 * @param currentUrl
 * @returns 
 */
export function selectSiteSettings(siteConfigurations: SiteConfiguration[], currentUrl: string): SiteConfiguration | null {
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
 * Gets the current mute method from storage
 * @returns Promise that resolves to the current MuteMethod setting, defaults to MuteMethod.Gag if not set
 */
export async function getMuteMethod(): Promise<MuteMethod> {
    return new Promise((resolve) => {
        chrome.storage.local.get([StorageKeys.MuteMethod], (result) => {
            if (chrome.runtime.lastError) {
                console.error('Ad Gagger: Error getting mute method:', chrome.runtime.lastError);
                resolve(MuteMethod.Gag); // Default to Gag if there's an error
                return;
            }

            const muteMethod = result[StorageKeys.MuteMethod];
            resolve(muteMethod || MuteMethod.Gag); // Default to Gag if not set
        });
    });
}
