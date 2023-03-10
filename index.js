const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

const createTimerAnimator = (seconds) => {
  for (seconds; seconds > 0; seconds--) {}
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (e) => {
  const regexp = new RegExp("^[0-9]+$");
  if (!regexp.test(e.target.value)) {
    e.target.value = "";
    alert("Enter a number");
  }
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
