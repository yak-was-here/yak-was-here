/**
 * Check if URL has changed (ignores hash/fragment/anchor changes)
 * @param oldUrl - the previous URL
 * @param newUrl - the new URL
 * @returns true if the URL changed
 */
export const hasUrlChanged = (
    oldUrl: string | URL,
    newUrl: string | URL
): boolean => {
    const oldUrlObj = new URL(oldUrl);
    const newUrlObj = new URL(newUrl);

    // Compare protocol, hostname, port, pathname, and search (query params)
    // Only ignore hash (fragment/anchor)
    return (
        oldUrlObj.protocol !== newUrlObj.protocol ||
        oldUrlObj.hostname !== newUrlObj.hostname ||
        oldUrlObj.port !== newUrlObj.port ||
        oldUrlObj.pathname !== newUrlObj.pathname ||
        oldUrlObj.search !== newUrlObj.search
    );
};
