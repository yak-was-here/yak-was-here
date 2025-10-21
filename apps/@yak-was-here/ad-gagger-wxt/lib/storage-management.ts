import { Settings } from "@/types/settings";
import { emptyStatistics, Statistics } from '@/types/statistics';

export enum StorageKeys {
    // Include storage location prefix. See: https://wxt.dev/storage.html#basic-usage
    MutedTabIds = 'local:mutedTabIds',
    Settings = 'sync:settings',
    Statistics = 'sync:statistics',
}

export interface StorageTypes {
    [StorageKeys.MutedTabIds]: number[];
    [StorageKeys.Settings]: Settings;
    [StorageKeys.Statistics]: Statistics;
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

export const statisticsStorage = storage.defineItem<
    StorageTypes[StorageKeys.Statistics],
    StorageMetaTypes
    >(StorageKeys.Statistics,
    {
        version: 1,
        fallback: emptyStatistics,
    }
);

