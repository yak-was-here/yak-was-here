import { removeTabFromMutedList } from './lib';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (!request || !sender || !sender.tab || !sender.tab.id || !sender.tab.mutedInfo) {
        return;
    }
    
    if (request.action === 'setTabMuteState') {
        chrome.tabs.get(request.tabId, (tab) => {
            if (chrome.runtime.lastError) {
                return;
            }
            chrome.tabs.update(request.tabId, {
                muted: request.mute,
            });
        });
    } else if (request.action === 'setCurrentTabMuteState') {
        chrome.tabs.get(sender.tab.id, (tab) => {
            if (chrome.runtime.lastError || !tab || !tab.id) {
                return;
            }
            // chrome.tabs.update(sender.tab.id, {
            chrome.tabs.update(tab.id, {
                muted: request.action === 'mute',
            });
        });
    } else if (request.action === 'getCurrentTabId') {
        sendResponse({ tabId: sender.tab.id });
    } else if (request.action === 'getTabMuteState') {
        sendResponse({ isMuted: sender.tab.mutedInfo.muted });
    }
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
    removeTabFromMutedList(tabId);
});
