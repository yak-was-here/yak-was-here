// Retrieve the current setting when popup opens
chrome.storage.sync.get(['muteMethod'], (result) => {
    const select = document.getElementById('muteMethod') as HTMLSelectElement;
    select.value = result.muteMethod || 'tab';
});

// Save the setting when changed
document.getElementById('muteMethod')?.addEventListener('change', (event) => {
    const select = event.target as HTMLSelectElement;
    chrome.storage.sync.set({ muteMethod: select.value });
});
