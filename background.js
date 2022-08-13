chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.sync.set({ volume: 6 });
});
