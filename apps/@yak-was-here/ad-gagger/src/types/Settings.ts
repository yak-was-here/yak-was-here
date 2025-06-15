import { SiteConfiguration } from './Configurations';

export enum StorageKeys {
    MutedTabIds = 'mutedTabIds',
    Configuration = 'configuration',
}

export interface Configuration {
    siteConfigurations: SiteConfiguration[];
}
