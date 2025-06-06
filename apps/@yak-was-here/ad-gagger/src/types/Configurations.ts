/**
 * @property {string} uriMatcher - The URI matcher for the site this configuration applies to
 * @property {string} adDetectorSelector - The selector for the element that indicates an ad is playing
 * @property {string | null} adContainerSelector - The selector for the container that contains the ad; by setting this, mutation observer will perform more efficiently otherwise null will use the body element
 * @property {string | null} adSkipButtonSelector - The selector for the skip button for the ad
 */
export type SiteConfiguration = {
    uriMatcher: string;
    adDetectorSelector: string;
    adContainerSelector: string | null;
    adSkipButtonSelector: string | null;
};
