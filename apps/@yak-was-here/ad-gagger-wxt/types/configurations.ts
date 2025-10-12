/**
 * @property {boolean} active - Whether this specific configuration is active or not
 * @property {string} domain - The domain this site configuration applies to
 * @property {string} adSelector - The CSS selector for the element that indicates an ad is playing
 * @property {string | null} adContainerSelector - The CSS selector for the container that contains the ad. By setting this, mutation observer will perform more efficiently. `null` will use the document.
 * @property {string | null} adCloseButtonSelector - The CSS selector for the ad skip button. `null` means the ad does not offer a skip button.
 */
export type SiteConfiguration = {
    enabled: boolean;
    match_string: string;
    adSelector: string;
    adContainerSelector: string | null;
    adCloseButtonSelector: string | null;
};
