import { SiteConfiguration } from '@/types/configurations';
import {
    muteTabConditionally,
    unmuteTabConditionally,
} from '@/lib/tab-management';
import { cleanUpObservers } from '@/utils/observers';

/**
 * Observes the start of an ad by monitoring the ad container for the addition of the adSelector element.
 * @param adObservers - An array of all current observers for a tab.
 * @param adContainer - The container element that holds the ad.
 * @param siteConfiguration - The configuration settings for the site.
 * @param tabId - The ID of the current tab.
 */
export const waitForAdStart = (
    adObservers: MutationObserver[],
    adContainer: Document | Element,
    siteConfiguration: SiteConfiguration,
    tabId: number
) => {
    cleanUpObservers(adObservers);

    const adStartObserver = new MutationObserver(async () => {
        if (adContainer.querySelector(siteConfiguration.adSelector)) {
            await muteTabConditionally(tabId);

            stopAdObserver(adObservers, adStartObserver);

            console.log('Ad started');

            waitForAdEnd(adObservers, adContainer, siteConfiguration, tabId);
        }
    });

    startAdObserver(adObservers, adStartObserver, adContainer);

    console.log('Waiting for ad to start');
};

/**
 * Observes the end of an ad by monitoring the ad container for the disappearance of the adSelector element.
 * @param adObservers - An array of all current observers for a tab.
 * @param adContainer - The container element that holds the ad.
 * @param siteConfiguration - The configuration settings for the site.
 * @param tabId - The ID of the current tab.
 */
export const waitForAdEnd = (
    adObservers: MutationObserver[],
    adContainer: Document | Element,
    siteConfiguration: SiteConfiguration,
    tabId: number
) => {
    cleanUpObservers(adObservers);

    const adEndObserver = new MutationObserver(async () => {
        if (!adContainer.querySelector(siteConfiguration.adSelector)) {
            await unmuteTabConditionally(tabId);

            stopAdObserver(adObservers, adEndObserver);

            console.log('Ad ended');

            waitForAdStart(adObservers, adContainer, siteConfiguration, tabId);
        }
    });

    startAdObserver(adObservers, adEndObserver, adContainer);

    console.log('Waiting for ad to end');
};

/**
 * Cleans up a observer by disconnecting and removing it from the ad observers list.
 * @param adObservers - An array of all current observers for a tab.
 * @param observer - The MutationObserver to stop.
 */
export const stopAdObserver = (
    adObservers: MutationObserver[],
    observer: MutationObserver
) => {
    observer.disconnect();

    // Remove from ad observers list
    const index = adObservers.indexOf(observer);
    if (index > -1) adObservers.splice(index, 1);
};

/**
 * Uses an observer to start observing for mutations and adds the observer to the ad observers list.
 * @param adObservers - An array of all current observers for a tab.
 * @param observer - The MutationObserver to start.
 * @param root - The root element to observe.
 */
export const startAdObserver = (
    adObservers: MutationObserver[],
    observer: MutationObserver,
    root: Document | Element
) => {
    adObservers.push(observer);
    observer.observe(root, {
        childList: true,
        subtree: true,
    });
};
