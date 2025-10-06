/**
 * Disconnects observers and empties the array
 * @param observers - An array of observers
 */
export const cleanUpObservers = (observers: MutationObserver[]) => {
    if (observers.length > 0) {
        observers.forEach((observer) => observer.disconnect());
        observers.length = 0;
    }
};
