const inputEl = document.querySelector("input");
const button = document.querySelector("button");
const timerEl = document.querySelector("span");

let timerId;

function toHoursAndMinutes(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}:${minutes}:${seconds}`;
}

const createTimerAnimator = (seconds) => {
  timerId = setInterval(() => {
    seconds > 0 ? (timerEl.innerHTML = toHoursAndMinutes(--seconds)) : null;
  }, 1000);
};

function checkEmptyTimer() {
  if (timerId) {
    clearInterval(timerId);
  }
}

const animateTimer = createTimerAnimator;

inputEl.addEventListener("input", (e) => {
  const regexp = new RegExp("^[0-9]+$");
  if (!regexp.test(e.target.value)) {
    e.target.value = "";
    alert("Enter a number");
  }
});

button.addEventListener("click", () => {
  checkEmptyTimer();
  const seconds = Number(inputEl.value);
  timerEl.innerHTML = toHoursAndMinutes(seconds);
  animateTimer(seconds);
  inputEl.value = "";
});
