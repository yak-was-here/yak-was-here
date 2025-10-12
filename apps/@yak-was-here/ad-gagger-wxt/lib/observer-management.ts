import { ElementConfiguration } from '@/types/configurations';
import { interactWithElement } from './interaction-management';

export enum ElementPresenceStatus {
    Appeared = 'appeared',
    Disappeared = 'disappeared',
}

/**
 * Observes when an element appears by monitoring the container for the addition of the selector element.
 * @param observers - An array of all current observers for a tab.
 * @param elementConfiguration - The configuration for the element being observed
 * @param tabId - The ID of the current tab.
 */
export const waitForElementAppearance = (
    observers: MutationObserver[],
    elementConfiguration: ElementConfiguration,
    tabId: number
) => {

    const appearanceObserver = new MutationObserver(async () => {
        
        const elementContainer: Document | Element =
            (elementConfiguration.containerSelector &&
                document.querySelector(
                    elementConfiguration.containerSelector
                )) ||
            document;
    
        const element = elementContainer.querySelector(elementConfiguration.selector);
        
        if (element) {

            stopObserver(observers, appearanceObserver);
            
            console.log('Element appeared', elementConfiguration.selector);

            await interactWithElement(element, elementConfiguration, ElementPresenceStatus.Appeared, tabId);

            waitForElementDisappearance(
                observers,
                elementConfiguration,
                tabId
            );
        }
    });

    const container: Document | Element =
        (elementConfiguration.containerSelector &&
            document.querySelector(elementConfiguration.containerSelector)) ||
        document;

    startObserver(observers, appearanceObserver, container);

    console.log('Waiting for element appearance', elementConfiguration.selector);
};

/**
 * Observes when an element disappears by monitoring the container for the absence of the selector element.
 * @param observers - An array of all current observers for a tab.
 * @param elementConfiguration - The configuration for the element being observed
 * @param tabId - The ID of the current tab.
 */
export const waitForElementDisappearance = (
    observers: MutationObserver[],
    elementConfiguration: ElementConfiguration,
    tabId: number
) => {

    const disappearanceObserver = new MutationObserver(async () => {
        
        const elementContainer: Document | Element =
            (elementConfiguration.containerSelector &&
                document.querySelector(
                    elementConfiguration.containerSelector
                )) ||
            document;
        
        const element = elementContainer.querySelector(
            elementConfiguration.selector
        );
        
        if (!element) {
            
            stopObserver(observers, disappearanceObserver);
            
            console.log('Element disappeared', elementConfiguration.selector);

            await interactWithElement(element, elementConfiguration, ElementPresenceStatus.Disappeared, tabId);

            waitForElementAppearance(
                observers,
                elementConfiguration,
                tabId
            );
        }
    });

    const container: Document | Element =
        (elementConfiguration.containerSelector &&
            document.querySelector(elementConfiguration.containerSelector)) ||
        document;

    startObserver(observers, disappearanceObserver, container);

    console.log('Waiting for element disappearance', elementConfiguration.selector);
};

/**
 * Cleans up a observer by disconnecting and removing it from the observers list.
 * @param observersArr - An array of all current observers for a tab.
 * @param observer - The MutationObserver to stop.
 */
export const stopObserver = (
    observersArr: MutationObserver[],
    observer: MutationObserver
) => {
    observer.disconnect();

    // Remove from observers list
    const index = observersArr.indexOf(observer);
    if (index > -1) observersArr.splice(index, 1);
    
    console.log(`Observer disconnected and removed:`, observersArr);
};

/**
 * Uses an observer to start observing for mutations and adds the observer to the observers list.
 * @param observersArr - An array of all current observers for a tab.
 * @param observer - The MutationObserver to start.
 * @param root - The root element to observe.
 */
export const startObserver = (
    observersArr: MutationObserver[],
    observer: MutationObserver,
    root: Document | Element
) => {
    observersArr.push(observer);
    observer.observe(root, {
        childList: true,
        subtree: true,
    });

    console.log(`Observer added and observing:`, observersArr);
};
