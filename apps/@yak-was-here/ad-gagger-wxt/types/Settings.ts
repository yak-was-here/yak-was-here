import { SiteConfiguration } from './Configurations';

export enum StorageKeys {
    MutedTabIds = 'mutedTabIds',
    Settings = 'settings',
}

export interface StorageData {
    [StorageKeys.MutedTabIds]: number[];
    [StorageKeys.Settings]: Settings;
}

export interface Settings {
    siteConfigurations: SiteConfiguration[];
}

export const defaultSettings: Settings = {
    siteConfigurations: [
        {
            enabled: true,
            match_string: '*://*.twitch.tv/*',
            adSelector: '[data-a-target="video-ad-label"]',
            adContainerSelector: '[data-a-target="video-player"]',
            adCloseButtonSelector: '[aria-label="Return to stream"]',
        },
        {
            enabled: false,
            match_string: '*://*.youtube.com/*',
            adSelector: 'div.html5-video-player.ad-showing',
            adContainerSelector: 'div.html5-video-player',
            adCloseButtonSelector:
                '.ytp-ad-skip-button-container:not([style*="display: none"]) .ytp-ad-skip-button',
        },
    ],
};
