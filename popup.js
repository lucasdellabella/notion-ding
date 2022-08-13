const level = document.getElementById("level");
const changeVolumeBy = (amt) => () => {
  const val = parseInt(level.textContent);
  if (10 >= val + amt && val + amt >= 0) {
    console.log(val);
    console.log(amt);
    level.textContent = val + amt;
  }
};

document
  .getElementById("quieter")
  .addEventListener("click", changeVolumeBy(-1));
document.getElementById("louder").addEventListener("click", changeVolumeBy(+1));
