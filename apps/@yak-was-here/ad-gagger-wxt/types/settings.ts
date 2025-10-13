import { StorageKeys } from '@/lib/storage-management';
import { InteractionType, SiteConfiguration } from '@/types/configurations';

export interface StorageData {
    [StorageKeys.MutedTabIds]: number[];
    [StorageKeys.Settings]: Settings;
}

export interface Settings {
    siteConfigurations: SiteConfiguration[];
}

/**********************
 * DEFAULTS
 **********************/

export const defaultSiteConfigurations: SiteConfiguration[] = [
    {
        id: '0199db91-1f77-7007-bc2a-652396cd390f',
        title: 'Twitch.tv Default',
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
        isUserCreated: false,
    },
    {
        id: '0199db91-619e-70ae-9a8d-d480714a31e6',
        title: 'YouTube Default',
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
        isUserCreated: false,
    },
];

export const defaultSettings: Settings = {
    siteConfigurations: defaultSiteConfigurations,
};
