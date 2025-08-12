import { StorageKeys } from '../types';
import { getStorageValue, setStorageValue } from './SettingsManagement';

/**
 * Gets the ID of the current tab using the chrome runtime API
 * @returns Promise that resolves to the current tab ID
 */
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

/**
 * Checks if a tab is in the local storage muted list
 * @param tabId The ID of the tab to check
 * @returns Promise that resolves to true if the tab is muted, false otherwise
 */
export async function isTabIdInMutedList(tabId: number): Promise<boolean> {
    const mutedTabIds = await getStorageValue(StorageKeys.MutedTabIds) ?? [];
    return mutedTabIds.includes(tabId);
}

// Function to add tab to muted array
export async function addTabToMutedList(tabId: number) {
    const mutedList = await getStorageValue(StorageKeys.MutedTabIds) ?? [];
    if (!mutedList.includes(tabId)) {
        mutedList.push(tabId);
        setStorageValue(StorageKeys.MutedTabIds, mutedList);
    }
}

// Function to remove tab from muted array
export async function removeTabFromMutedList(tabId: number) {
    const mutedList = await getStorageValue(StorageKeys.MutedTabIds) ?? [];
    const updatedList = mutedList.filter((id) => id !== tabId);
    setStorageValue(StorageKeys.MutedTabIds, updatedList);
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

/**
 * Mute the tab if it is not already muted by the extension (indicated by being in the muted list); otherwise it might have been unmuted by the user (maybe they are interested in the ad)
 * @param tabId 
 */
export const handleTabMute = async (tabId: number): Promise<void> => {
    const inMutedList = await isTabIdInMutedList(tabId);
    const muted = await isCurrentTabMuted();
    if (!inMutedList && !muted) {
        setTabMuteState(tabId, true);
        
        console.log('Ad Gagger: Muted tab.');
    }
    await addTabToMutedList(tabId);
}

/**
 * Unmute the tab if it was muted by the extension (indicated by being in the muted list); otherwise it might have been muted by the user
 * @param tabId 
 */
export const handleTabUnmute = async (tabId: number): Promise<void> => {
    const inMutedList = await isTabIdInMutedList(tabId);
    const muted = await isCurrentTabMuted();
    if (inMutedList && muted) {
        setTabMuteState(tabId, false);
        
        console.log('Ad Gagger: Unmuted tab.');
    }
    await removeTabFromMutedList(tabId);
}
