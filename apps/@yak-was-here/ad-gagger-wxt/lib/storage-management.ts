import { Settings } from "@/types/settings";

export enum StorageKeys {
    // Includes storage location prefix. See: https://wxt.dev/storage.html#basic-usage
    MutedTabIds = 'local:mutedTabIds',
    Settings = 'sync:settings'
}

export interface StorageTypes {
    [StorageKeys.MutedTabIds]: number[];
    [StorageKeys.Settings]: Settings;
}

export enum StorageMetaKeys {
    lastModified = 'lastModified'
}

export interface StorageMetaTypes extends Record<string, unknown> {
    [StorageMetaKeys.lastModified]: number;
}

export const settingsStorage = storage.defineItem<StorageTypes[StorageKeys.Settings], StorageMetaTypes>(
    StorageKeys.Settings,
    {
        version: 1,
    }
);

export const mutedTabIdsStorage = storage.defineItem<StorageTypes[StorageKeys.MutedTabIds]>(
    StorageKeys.MutedTabIds,
    {
        fallback: [],
    }
);


