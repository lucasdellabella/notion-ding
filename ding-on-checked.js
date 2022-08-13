const url = chrome.runtime.getURL("assets/ding.wav");
const getNonLinearVolumeLevel = (volume) => {
  const volumeBetween0and1 = volume / 10;
  const EXP_SCALE_FACTOR = 4;
  return (
    Math.exp(EXP_SCALE_FACTOR * volumeBetween0and1) / Math.exp(EXP_SCALE_FACTOR)
  );
};

document.addEventListener("click", (event) => {
  const completed = event.path
    .map((e) => e.classList)
    .filter(Boolean)
    .some((classList) => classList.contains("checkboxSquare"));

  if (completed) {
    chrome.storage.sync.get(["volume"], ({ volume }) => {
      const ding = new Audio(url);
      ding.volume = getNonLinearVolumeLevel(volume);
      ding.play();
    });
  }
});
