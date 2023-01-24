

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const bodyColor = document.querySelector("body");
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

// body.style.backgroundColor = getRandomHexColor();
let timerId = 0;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor()
  }, 1000);

  onClickStart()
});

function onClickStart() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

function onClickStop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
};


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  onClickStop()
});


