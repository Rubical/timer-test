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

function timerStarted() {
  buttonStart.style.display = "none";
  buttonStop.style.display = "inline-block";
  inputEl.setAttribute("disabled", "disabled");
  timerEl.innerHTML = toHoursAndMinutes(localStorage.getItem("seconds"));
  animateTimer(localStorage.getItem("seconds"));
  inputEl.value = "";
}

function timerStopped() {
  buttonStart.style.display = "inline-block";
  buttonStop.style.display = "none";
  inputEl.removeAttribute("disabled", "disabled");
  clearInterval(timerId);
}

function checkEmptyTimer() {
  if (timerId) {
    clearInterval(timerId);
  }
}

const createTimerAnimator = (seconds) => {
  timerId = setInterval(() => {
    if (
      localStorage.getItem("seconds") &&
      localStorage.getItem("seconds") > 0
    ) {
      localStorage.setItem("seconds", --seconds);
      timerEl.innerHTML = toHoursAndMinutes(localStorage.getItem("seconds"));
    } else if (localStorage.getItem("seconds") === "0") {
      timerEl.innerHTML = "hh:mm:ss";
      timerStopped();
    }
  }, 1000);
};

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
    localStorage.setItem("seconds", inputEl.value);
    timerStarted();
  } else if (localStorage.getItem("seconds")) {
    timerStarted();
  }
});

buttonStop.addEventListener("click", () => {
  timerStopped();
});

buttonReset.addEventListener("click", () => {
  localStorage.removeItem("seconds");
  timerStopped();
  timerEl.innerHTML = "hh:mm:ss";
});
