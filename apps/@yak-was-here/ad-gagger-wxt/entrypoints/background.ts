import { handleTabUnmute } from "@/lib";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});

// Receive messages from content scripts
browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (!request || !sender || !sender.tab || !sender.tab.id || !sender.tab.mutedInfo) {
        return;
    }
    
    if (request.action === 'setTabMuteState') {
        browser.tabs.get(request.tabId, (tab) => {
            if (browser.runtime.lastError) {
                return;
            }
            browser.tabs.update(request.tabId, {
                muted: request.mute,
            });
        });
    } else if (request.action === 'setCurrentTabMuteState') {
        browser.tabs.get(sender.tab.id, (tab) => {
            if (browser.runtime.lastError || !tab || !tab.id) {
                return;
            }
            // browser.tabs.update(sender.tab.id, {
            browser.tabs.update(tab.id, {
                muted: request.action === 'mute',
            });
        });
    } else if (request.action === 'getCurrentTabId') {
        sendResponse({ tabId: sender.tab.id });
    } else if (request.action === 'getTabMuteState') {
        sendResponse({ isMuted: sender.tab.mutedInfo.muted });
    }
});

browser.tabs.onRemoved.addListener(async (tabId) => {
    await handleTabUnmute(tabId);
});
