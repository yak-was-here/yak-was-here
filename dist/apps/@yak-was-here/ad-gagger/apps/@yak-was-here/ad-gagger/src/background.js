chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "mute" || request.action === "unmute") {
    chrome.tabs.get(sender.tab.id, (tab) => {
      if (chrome.runtime.lastError) {
        return;
      }
      chrome.tabs.update(sender.tab.id, { muted: request.action === "mute" });
    });
  }
});
let active = false;
function makeOrange(color) {
  document.body.style.backgroundColor = color;
}
chrome.action.onClicked.addListener((tab) => {
  active = !active;
  const color = active ? "orange" : "white";
  chrome.scripting.executeScript({
    target: { tabId: tab.id ? tab.id : -1 },
    func: makeOrange,
    args: [color]
  }).then();
});
