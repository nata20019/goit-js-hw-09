const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
// document.body

btnStart.addEventListener('click', onClickBtnStart);
btnStop.addEventListener('click', onClickBtnStop);
let timerId = null;
function onClickBtnStart() {
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickBtnStop() {
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
  clearInterval(timerId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
