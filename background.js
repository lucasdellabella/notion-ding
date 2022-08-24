chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.sync.set({ volume: 6 });
  chrome.tabs.create({
    url: "installed.html",
    active: true,
  });
});
