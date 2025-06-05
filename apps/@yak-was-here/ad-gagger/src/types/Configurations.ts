/**
 * @property {string} uriMatcher - The URI matcher for the site this configuration applies to
 * @property {string} adDetectionElementSelector - The selector for the element that indicates an ad is playing
 * @property {string | null} adSkipButtonSelector - The selector for the skip button for the ad
 * @property {string | null} adContainerSelector - The selector for the container that contains the ad; by selecting this mutation observer will perform better
 */
export type SiteConfiguration = {
    uriMatcher: string;
    adDetectionElementSelector: string;
    adSkipButtonSelector: string | null;
    adContainerSelector: string | null;
};
