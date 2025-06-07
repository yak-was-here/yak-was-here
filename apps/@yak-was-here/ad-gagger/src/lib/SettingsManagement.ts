import { SiteConfiguration, StorageKeys } from '../types';

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
