import { Settings } from "@/types/settings";

export enum StorageKeys {
    // Includes storage location prefix. See: https://wxt.dev/storage.html#basic-usage
    MutedTabIds = 'local:mutedTabIds',
    Settings = 'sync:settings'
}

export const settingsStorage = storage.defineItem<Settings>(
    StorageKeys.Settings,
    {
        version: 1,
    }
);

export const mutedTabIdsStorage = storage.defineItem<number[]>(
    StorageKeys.MutedTabIds,
    {
        fallback: [],
        version: 1,
    }
);


