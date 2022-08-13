const url = chrome.runtime.getURL("assets/ding.wav");
const ding = new Audio(url);

document.addEventListener("click", (event) => {
  const completed = event.path
    .map((e) => e.classList)
    .filter(Boolean)
    .some((classList) => classList.contains("checkboxSquare"));

  if (completed) {
    ding.play();
  }
});
