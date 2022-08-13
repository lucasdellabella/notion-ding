chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.sync.set({ volume: 0.5 });
});
