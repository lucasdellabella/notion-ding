let volume = 0.5;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, volume: newVolume } = message;
  if (type === "changeVolume") {
    volume = newVolume;
    sendResponse();
  }

  if (type === "checkVolume") {
    sendResponse({ volume });
  }

  return true;
});
