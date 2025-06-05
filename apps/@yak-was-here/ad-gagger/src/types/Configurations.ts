/**
 * @property {string} uriMatcher - The URI matcher for the site this configuration applies to
 * @property {string} adDetectionElementSelector - The selector for the element that indicates an ad is playing
 * @property {string} parentToAdSelector - The selector for the parent element that contains the ad; this is used to minimize the number of elements that need to be watched for changes
 * @property {KeyboardEvent['key'][]} muteKeyBind - The key bind to mute the player containing the ad; each string in the array represents a key to press
 * @property {KeyboardEvent['key'][]} unmuteKeyBind - The key bind to unmute the player containing the ad; each string in the array represents a key to press
 */
export type SiteConfiguration = {
    uriMatcher: string;
    adDetectionElementSelector: string;
    parentToAdSelector: string;
    muteKeyBind: KeyboardEvent['key'][];
    unmuteKeyBind: KeyboardEvent['key'][];
};
