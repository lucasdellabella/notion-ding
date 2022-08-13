const url = chrome.runtime.getURL("assets/ding.wav");

document.addEventListener("click", (event) => {
  const completed = event.path
    .map((e) => e.classList)
    .filter(Boolean)
    .some((classList) => classList.contains("checkboxSquare"));

  if (completed) {
    chrome.runtime.sendMessage({ type: "checkVolume" }).then(({ volume }) => {
      const ding = new Audio(url);
      ding.volume = Math.exp(3 * volume) / Math.exp(3 * 1);
      ding.play();
    });
  }
});
