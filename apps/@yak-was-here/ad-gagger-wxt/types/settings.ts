import { InteractionType, SiteConfiguration } from '@/types/configurations';

export enum StorageKeys {
    // Includes storage location prefix. See: https://wxt.dev/storage.html#basic-usage
    MutedTabIds = 'local:mutedTabIds',
    Settings = 'sync:settings',
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
            matchString: '*://*.twitch.tv/*',
            elementConfigurations: [
                {
                    type: InteractionType.GAG,
                    selector: '[data-a-target="video-ad-label"]',
                    containerSelector: '[data-a-target="video-player"]',
                },
                {
                    type: InteractionType.CLICK,
                    selector: 'button[aria-label="Return to stream"]',
                    containerSelector: '',
                },
            ],
        },
        {
            enabled: false,
            matchString: '*://*.youtube.com/*',
            elementConfigurations: [
                {
                    type: InteractionType.GAG,
                    selector: 'div.html5-video-player.ad-showing',
                    containerSelector: 'div.html5-video-player',
                },
                {
                    type: InteractionType.CLICK,
                    selector:
                        '.ytp-ad-skip-button-container:not([style*="display: none"]) .ytp-ad-skip-button',
                    containerSelector: 'div.html5-video-player',
                },
            ],
        },
    ],
};
