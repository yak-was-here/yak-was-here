/**
 * @property id - uuid v7
 * @property title - title of this configuration (can be used for notes)
 * @property enabled - Whether this specific configuration is active or not
 * @property matchString - The URL this site configuration applies to (e.g. "*://*.twitch.tv/*"). See: https://wxt.dev/api/reference/wxt/utils/match-patterns/classes/MatchPattern.html. Multiple site configurations are allowed to match to the same URL (e.g. a general twitch config via "*://*.twitch.tv/*" and a specific URL via "*://*.twitch.tv/directory/category/irl"). The site configurations will be applied in first-to-last order, meaning the last one is applied last. But conflicting configurations are discouraged.
 * @property elementConfigurations - The configurations for interactive elements that need to be gagged
 * @property isUserCreated - Whether this site configuration was made by the user. Site configurations that ship with the extension are false (not editable) and user-generated are true (editable).
 */
export type SiteConfiguration = {
    id: string;
    title: string;
    enabled: boolean;
    matchString: string;
    elementConfigurations: ElementConfiguration[];
    isUserCreated: boolean;
};

export enum InteractionType {
    GAG = 'gag',
    CLICK = 'click',
}

export type ElementConfiguration = {
    type: InteractionType;
    selector: string;
    containerSelector: string;
};
