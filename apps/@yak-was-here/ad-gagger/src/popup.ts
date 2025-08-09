import { SiteConfiguration, StorageKeys, defaultSettings } from './types';

async function loadSettings(): Promise<SiteConfiguration[]> {
    const result = await chrome.storage.local.get(StorageKeys.Settings);
    return result[StorageKeys.Settings] || defaultSettings.siteConfigurations;
}

async function saveSettings(settings: SiteConfiguration[]) {
    await chrome.storage.local.set({ [StorageKeys.Settings]: settings });

    // Notify content scripts of the update
    const tabs = await chrome.tabs.query({});
    tabs.forEach((tab) => {
        if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
                type: 'CONFIGURATION_UPDATED',
                configurations: settings,
            });
        }
    });
}

function displaySettings(settings: SiteConfiguration[]) {
    const configList = document.getElementById('configList');
    if (!configList) return;

    configList.innerHTML = settings
        .map(
            (config) => `
        <div class="config-item">
            <strong>Site:</strong> ${config.uriMatcher}<br>
            <strong>Ad Selector:</strong> ${config.adSelector}
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
    const configs = await loadSettings();
    displaySettings(configs);

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

            await saveSettings(newConfigs);
            displaySettings(newConfigs);
            configFile.value = '';
        } catch (error) {
            const errorMessage =
                typeof error === 'object' && error !== null && 'message' in error
                    ? (error as { message: string }).message
                    : String(error);
            showError(`Error loading configuration: ${errorMessage}`);
        }
    });

    resetButton?.addEventListener('click', async () => {
        await saveSettings(defaultSettings.siteConfigurations);
        displaySettings(defaultSettings.siteConfigurations);
    });
});
