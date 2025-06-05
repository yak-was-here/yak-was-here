import { StorageKeys, MuteMethod } from './types';

// Retrieve the current setting when popup opens
chrome.storage.sync.get([StorageKeys.MuteMethod], (result) => {
    const select = document.getElementById(
        StorageKeys.MuteMethod
    ) as HTMLSelectElement;
    select.value = result.muteMethod || MuteMethod.Tab;
});

// Save the setting when changed
document
    .getElementById(StorageKeys.MuteMethod)
    ?.addEventListener('change', (event) => {
        const select = event.target as HTMLSelectElement;
        chrome.storage.sync.set({ muteMethod: select.value });
    });
