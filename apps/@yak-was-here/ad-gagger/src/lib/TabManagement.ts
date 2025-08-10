import { StorageKeys } from '../types';

// Function to get current tab ID
export async function getCurrentTabId(): Promise<number> {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(
            { action: 'getCurrentTabId' },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error(
                        'Ad Gagger: Error getting tab ID:',
                        chrome.runtime.lastError
                    );
                    return;
                }
                resolve(response.tabId);
            }
        );
    });
}

// Function to check if tab should be muted
export async function isTabIdInMutedList(tabId: number): Promise<boolean> {
    return new Promise((resolve) => {
        chrome.storage.local.get([StorageKeys.MutedTabIds], (result) => {
            const mutedTabIds: number[] = result[StorageKeys.MutedTabIds] || [];
            resolve(mutedTabIds.includes(tabId));
        });
    });
}

// Function to add tab to muted array
export function addTabToMutedList(tabId: number) {
    chrome.storage.local.get([StorageKeys.MutedTabIds], (result) => {
        const mutedTabIds: number[] = result[StorageKeys.MutedTabIds] || [];
        if (!mutedTabIds.includes(tabId)) {
            mutedTabIds.push(tabId);
            chrome.storage.local.set({ [StorageKeys.MutedTabIds]: mutedTabIds });
        }
    });
}

// Function to remove tab from muted array
export function removeTabFromMutedList(tabId: number) {
    chrome.storage.local.get([StorageKeys.MutedTabIds], (result) => {
        const mutedTabIds: number[] = result[StorageKeys.MutedTabIds] || [];
        const updatedIds = mutedTabIds.filter((id) => id !== tabId);
        chrome.storage.local.set({ [StorageKeys.MutedTabIds]: updatedIds });
    });
}

/**
 * Checks if a specific tab is currently muted
 * @returns Promise that resolves to true if the tab is muted, false otherwise
 */
export async function isCurrentTabMuted(): Promise<boolean> {
    try {
        const response = await chrome.runtime.sendMessage({
            action: 'getTabMuteState',
        });
        return response.isMuted;
    } catch (error) {
        console.error('Ad Gagger: Error getting current tab mute state:', error);
        return false;
    }
}

/**
 * Sets the mute state for a specific tab id
 * @param tabId The ID of the tab to mute/unmute
 * @param mute Whether to mute (true) or unmute (false) the tab
 */
export function setTabMuteState(tabId: number, mute: boolean): void {
    chrome.runtime.sendMessage({
        action: 'setTabMuteState',
        tabId: tabId,
        mute: mute,
    });
    console.info(`Ad Gagger: Tab ${tabId} ${mute ? 'muted' : 'unmuted'}`);
}

/**
 * Sets the mute state for the current tab
 * @param mute Whether to mute (true) or unmute (false) the tab
 */
export function setCurrentTabMuteState(mute: boolean): void {
    chrome.runtime.sendMessage({
        action: 'setCurrentTabMuteState',
        mute: mute,
    });
    console.info(`Ad Gagger: Current tab ${mute ? 'muted' : 'unmuted'}`);
}
