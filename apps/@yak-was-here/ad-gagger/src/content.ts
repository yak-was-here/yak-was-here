declare const chrome: any;

const elementSelector = '#your-specific-element-id'; // Change this to the specific element you want to detect.

function checkElement() {
  const element = document.querySelector(elementSelector);
  if (element) {
    chrome.runtime.sendMessage({ action: "mute" });
  } else {
    chrome.runtime.sendMessage({ action: "unmute" });
  }
}

// Check once on load
checkElement();

// Mutations observer to detect changes in the DOM
const observer = new MutationObserver(checkElement);
observer.observe(document.body, { childList: true, subtree: true });
