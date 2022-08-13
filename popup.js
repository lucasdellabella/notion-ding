// TODO:
// 1. text content is not getting initialized to the proper value
// 2. volume is not changing 🤔
const level = document.getElementById("level");
chrome.runtime.sendMessage({ type: "checkVolume" }).then(({ volume }) => {
  level.textContent = Math.round(volume * 10);
});

const changeVolumeBy = (amt) => () => {
  const newVolume = parseInt(level.textContent) + amt;
  if (10 >= newVolume && newVolume >= 0) {
    level.textContent = newVolume;
    chrome.runtime.sendMessage({
      type: "changeVolume",
      volume: newVolume / 10,
    });
  }
};

document
  .getElementById("quieter")
  .addEventListener("click", changeVolumeBy(-1));
document.getElementById("louder").addEventListener("click", changeVolumeBy(+1));
