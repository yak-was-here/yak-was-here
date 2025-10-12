/**
 * @property enabled - Whether this specific configuration is active or not
 * @property matchString - The domain this site configuration applies to (e.g. "*://*.twitch.tv/*"). See: https://wxt.dev/api/reference/wxt/utils/match-patterns/classes/MatchPattern.html
 * @property elementConfigurations - The configurations for interactive elements that need to be gagged
 */
export type SiteConfiguration = {
    enabled: boolean;
    matchString: string;
    elementConfigurations: ElementConfiguration[];
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
