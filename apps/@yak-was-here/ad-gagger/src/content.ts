const twitchAdOverlaySelector = '[aria-label="Ad"]';

function checkElement() {
    const element = document.querySelector(twitchAdOverlaySelector);
    if (element) {
        chrome.runtime.sendMessage({ action: 'mute' });
    } else {
        chrome.runtime.sendMessage({ action: 'unmute' });
    }
}

// Check once on load
checkElement();

// Mutations observer to detect changes in the DOM
const observer = new MutationObserver(checkElement);
observer.observe(document.body, { childList: true, subtree: true });
