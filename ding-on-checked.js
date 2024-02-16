const url = chrome.runtime.getURL("assets/ding.wav");
const getNonLinearVolumeLevel = (volume) => {
  const volumeBetween0and1 = volume / 10;
  const EXP_SCALE_FACTOR = 4;
  return (
    Math.exp(EXP_SCALE_FACTOR * volumeBetween0and1) / Math.exp(EXP_SCALE_FACTOR)
  );
};

document.addEventListener("click", (event) => {
  const path = event.composedPath()
  const checkbox = path.find(element => element.matches("input[type=checkbox]"))
  const isCheckboxClick = !!checkbox;
  const isUnchecked = checkbox.parentElement.getElementsByClassName('check').length === 0

  if (isCheckboxClick && isUnchecked) {
    chrome.storage.sync.get(["volume"], ({ volume }) => {
      if (volume === 0) return;

      const ding = new Audio(url);
      ding.volume = getNonLinearVolumeLevel(volume);
      ding.play();
    });
  }
});
