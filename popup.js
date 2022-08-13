// TODO:
// 1. text content is not getting initialized to the proper value
// 2. volume is not changing 🤔
const level = document.getElementById("level");
chrome.storage.sync.get(["volume"], ({ volume }) => {
  level.textContent = Math.round(volume * 10);
});

const changeVolumeBy = (amt) => () => {
  console.log(amt);
  const newVolume = parseInt(level.textContent) + amt;
  if (10 >= newVolume && newVolume >= 0) {
    level.textContent = newVolume;
    chrome.storage.sync.set({ volume: newVolume / 10 });
  }
};

document
  .getElementById("quieter")
  .addEventListener("click", changeVolumeBy(-1));
document.getElementById("louder").addEventListener("click", changeVolumeBy(+1));
