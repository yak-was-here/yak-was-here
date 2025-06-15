/**
 * @property {boolean} active - Whether this specific configuration is active or not
 * @property {string} uriMatcher - The URI matcher for the site this configuration applies to
 * @property {string} adDetectorSelector - The CSS selector for the element that indicates an ad is playing
 * @property {string | null} adContainerSelector - The CSS selector for the container that contains the ad. By setting this, mutation observer will perform more efficiently. `null` will use the body element.
 * @property {string | null} adCloseButtonSelector - The CSS selector for the ad skip button. `null` means the ad will not be skipped.
 */
export type SiteConfiguration = {
    active: boolean;
    uriMatcher: string;
    adDetectorSelector: string;
    adContainerSelector: string | null;
    adCloseButtonSelector: string | null;
};
