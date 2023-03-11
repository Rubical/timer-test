const inputEl = document.querySelector("input");
const buttonStart = document.querySelector("#start");
const buttonStop = document.querySelector("#stop");
const buttonReset = document.querySelector("#reset");
const timerEl = document.querySelector("span");

let timerId;

function toHoursAndMinutes(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}:${minutes}:${seconds}`;
}

function timerRunning() {
  buttonStart.style.display = "none";
  buttonStop.style.display = "inline-block";
}

function timerStopped() {
  buttonStart.style.display = "inline-block";
  buttonStop.style.display = "none";
}

const createTimerAnimator = (seconds) => {
  timerId = setInterval(() => {
    if (
      localStorage.getItem("seconds") &&
      localStorage.getItem("seconds") > 0
    ) {
      localStorage.setItem("seconds", --seconds);
      timerEl.innerHTML = toHoursAndMinutes(localStorage.getItem("seconds"));
    } else if (localStorage.getItem("seconds") == 0) {
      timerEl.innerHTML = "hh:mm:ss";
      clearInterval(timerId);
    }
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

buttonStart.addEventListener("click", () => {
  if (inputEl.value) {
    timerRunning();
    localStorage.setItem("seconds", Number(inputEl.value));
    timerEl.innerHTML = toHoursAndMinutes(localStorage.getItem("seconds"));
  } else if (localStorage.getItem("seconds")) {
    timerRunning();
    timerEl.innerHTML = toHoursAndMinutes(localStorage.getItem("seconds"));
  }
  animateTimer(localStorage.getItem("seconds"));
  inputEl.value = "";
});

buttonReset.addEventListener("click", () => {
  clearInterval(timerId);
  timerStopped();
  localStorage.removeItem("seconds");
  timerEl.innerHTML = "hh:mm:ss";
});

buttonStop.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerStopped();
  }
});
