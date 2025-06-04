const elementSelector = "#your-specific-element-id";
function checkElement() {
  const element = document.querySelector(elementSelector);
  if (element) {
    chrome.runtime.sendMessage({ action: "mute" });
  } else {
    chrome.runtime.sendMessage({ action: "unmute" });
  }
}
checkElement();
const observer = new MutationObserver(checkElement);
observer.observe(document.body, { childList: true, subtree: true });
