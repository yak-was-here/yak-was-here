import { SiteConfiguration } from './types';

const DEFAULT_CONFIGURATIONS: SiteConfiguration[] = [
    {
        uriMatcher: 'https://www.twitch.tv/',
        adDetectorSelector: '[data-a-target="video-ad-label"]',
        adContainerSelector: '[data-a-target="video-player"]',
        adCloseButtonSelector: null,
    },
    {
        uriMatcher: 'https://www.youtube.com/',
        adDetectorSelector: 'div.html5-video-player.ad-showing',
        adContainerSelector: '.html5-video-player',
        adCloseButtonSelector:
            '.ytp-ad-skip-button-container:not([style*="display: none"]) .ytp-ad-skip-button',
    },
];

const STORAGE_KEY = StorageKeys.Configuration;

async function loadConfigurations(): Promise<SiteConfiguration[]> {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || DEFAULT_CONFIGURATIONS;
}

async function saveConfigurations(configs: SiteConfiguration[]) {
    await chrome.storage.local.set({ [STORAGE_KEY]: configs });

    // Notify content scripts of the update
    const tabs = await chrome.tabs.query({});
    tabs.forEach((tab) => {
        if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
                type: 'CONFIGURATION_UPDATED',
                configurations: configs,
            });
        }
    });
}

function displayConfigurations(configs: SiteConfiguration[]) {
    const configList = document.getElementById('configList');
    if (!configList) return;

    configList.innerHTML = configs
        .map(
            (config) => `
        <div class="config-item">
            <strong>Site:</strong> ${config.uriMatcher}<br>
            <strong>Ad Detector:</strong> ${config.adDetectorSelector}
        </div>
    `
        )
        .join('');
}

function showError(message: string) {
    const errorDiv = document.getElementById('error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const configs = await loadConfigurations();
    displayConfigurations(configs);

    const uploadButton = document.getElementById('uploadButton');
    const configFile = document.getElementById(
        'configFile'
    ) as HTMLInputElement;
    const resetButton = document.getElementById('resetButton');

    uploadButton?.addEventListener('click', async () => {
        const file = configFile?.files?.[0];
        if (!file) {
            showError('Please select a file');
            return;
        }

        try {
            const text = await file.text();
            const newConfigs = JSON.parse(text);

            // Validate configuration structure
            if (
                !Array.isArray(newConfigs) ||
                !newConfigs.every(
                    (config) =>
                        typeof config.uriMatcher === 'string' &&
                        typeof config.adDetectorSelector === 'string' &&
                        typeof config.adContainerSelector === 'string'
                )
            ) {
                throw new Error('Invalid configuration format');
            }

            await saveConfigurations(newConfigs);
            displayConfigurations(newConfigs);
            configFile.value = '';
        } catch (error) {
            showError(`Error loading configuration: ${error.message}`);
        }
    });

    resetButton?.addEventListener('click', async () => {
        await saveConfigurations(DEFAULT_CONFIGURATIONS);
        displayConfigurations(DEFAULT_CONFIGURATIONS);
    });
});
