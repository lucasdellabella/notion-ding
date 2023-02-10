const level = document.getElementById("level");
chrome.storage.sync.get(["volume"], ({ volume }) => {
  level.textContent = Math.round(volume || 6);
});

chrome.storage.sync.get(["providedEmail"], ({ providedEmail }) => {
  if (providedEmail) {
    document.getElementById("email-container").remove();
  }
});

const changeVolumeBy = (amt) => () => {
  console.log(amt);
  const newVolume = parseInt(level.textContent) + amt;
  if (10 >= newVolume && newVolume >= 0) {
    level.textContent = newVolume;
    chrome.storage.sync.set({ volume: newVolume });
  }
};

const markInvalid = () => {
  if (document.getElementById("email-input").classList.contains("valid")) {
    document.getElementById("email-input").classList.remove("valid");
  }
  document.getElementById("email-input").classList.add("invalid");
};

const markValid = () => {
  document.getElementById("email-input").classList.remove("invalid");
  document.getElementById("email-input").classList.add("valid");
};

const setVolumeControlsToRingOnClick = () => {
  const url = chrome.runtime.getURL("assets/ding.wav");
  const getNonLinearVolumeLevel = (volume) => {
    const volumeBetween0and1 = volume / 10;
    const EXP_SCALE_FACTOR = 4;
    return (
      Math.exp(EXP_SCALE_FACTOR * volumeBetween0and1) /
      Math.exp(EXP_SCALE_FACTOR)
    );
  };

  document.addEventListener("click", (event) => {
    const completed = event.composedPath()
      .map((e) => e.classList)
      .filter(Boolean)
      .some((classList) => classList.contains("volume-btn"));

    if (completed) {
      chrome.storage.sync.get(["volume"], ({ volume }) => {
        if (volume === 0) return;

        const ding = new Audio(url);
        ding.volume = getNonLinearVolumeLevel(volume);
        ding.play();
      });
    }
  });
};

document
  .getElementById("quieter")
  .addEventListener("click", changeVolumeBy(-1));
document.getElementById("louder").addEventListener("click", changeVolumeBy(+1));
// document
//   .getElementById("email")
//   .addEventListener("invalid", function (event) {
//     event.preventDefault();
//   });
document
  .getElementById("email-input-container")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("tried to submit");
    const input = document.getElementById("email-input").value;
    const isEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,10}");
    if (isEmail.test(input)) {
      markValid();
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        chrome.storage.sync.set({ providedEmail: true });
        document.getElementById("email-input-container").submit();
      });
    } else {
      markInvalid();
    }
  });

setVolumeControlsToRingOnClick();
