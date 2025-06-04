chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'mute' || request.action === 'unmute') {
        chrome.tabs.get(sender.tab.id, (tab) => {
            if (chrome.runtime.lastError) {
                return;
            }
            chrome.tabs.update(sender.tab.id, {
                muted: request.action === 'mute',
            });
        });
    }
});
