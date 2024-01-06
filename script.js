"use strict";
const inputContainer = document.querySelector(".input");
const passwordInputs = document.querySelectorAll(`input`);
let passwordInputsContainer = document.querySelector(".passcodeInputs");
let correctElement = document.querySelector(".correct-icon");
const attemptsParagraph = document.querySelector(".attempts");
const overlayElement = document.querySelector(".over");
let clearButton = document.querySelector(".del");
const tryAgainButton = document.querySelector(".try-again");

let setPassCode = prompt(`
SET NEW PASS CODE
-----------------------------
NB. Pass code must be numeric, and cannot be not be more than 4 digits.


`);
// let setPassCode = 1111;

const dialNumberArray = Array.from({ length: 10 }, (_, item) => item);
let activeInputIndex = 0;
let passCode = [];

let maxAttempt = 3;
let currentAttempt = 0;
function focusOnFirstInput() {
  if (passwordInputs.length > 0) {
    passwordInputs[0].focus();
  }
}

function resetAll() {
  overlayElement.classList.remove("active");
  currentAttempt = 0;
  focusOnFirstInput();
}
function correctAttempt() {
  console.log(`correct password`);
  passwordInputsContainer.classList.add("hidden");
  correctElement.classList.remove("hidden");
  correctElement.classList.add("scale-up-center");
  // Reset attempt count on successful entry
  currentAttempt = 0;
}
function triggerAnimation() {
  passwordInputsContainer.classList.remove("wrong");
  setTimeout(() => {
    passwordInputsContainer.classList.add("wrong");
  }, 1);
  clearAllInputs();
}
function checkPassCode(code) {
  if (code.length === passwordInputs.length) {
    let passCodeNum = +passCode.join("");
    if (passCodeNum === +setPassCode) {
      correctAttempt();
    } else {
      currentAttempt++;
      triggerAnimation();
      console.log(`Wrong code. Attempts left: ${maxAttempt - currentAttempt}`);
    }
    if (currentAttempt >= maxAttempt) {
      overlayElement.classList.add("active");
      console.log(overlayElement);
      console.log(`max attempt reached`);
    }
  }
}

focusOnFirstInput();
function handleInput(digit) {
  let numberDigit = +digit;
  if (isNaN(numberDigit)) return;

  if (currentAttempt >= maxAttempt) return;
  if (activeInputIndex < passwordInputs.length) {
    let activeInput = passwordInputs[activeInputIndex];
    activeInput.value = numberDigit;
    passCode[activeInputIndex] = numberDigit;

    if (activeInputIndex < passwordInputs.length - 1) {
      passwordInputs[activeInputIndex + 1].focus();
      activeInputIndex++;
    }
    checkPassCode(passCode);
  }
}

function clearAllInputs() {
  passwordInputs.forEach((item) => {
    item.value = "";
    focusOnFirstInput();
    activeInputIndex = 0;
    passCode = [];
  });
}

function shuffleNumbers(numArray) {
  let shuffledNumbersArray = [];
  let numArrayCopy = [...numArray];
  while (numArrayCopy.length > 0) {
    let randomNumber = Math.trunc(Math.random() * numArrayCopy.length);
    shuffledNumbersArray.push(numArrayCopy[randomNumber]);
    numArrayCopy.splice(randomNumber, 1);
  }

  inputContainer.innerHTML = "";
  shuffledNumbersArray.map((item) => {
    let spanElement = `<span>${item} </span>`;
    inputContainer.insertAdjacentHTML("beforeend", spanElement);
  });
  return shuffledNumbersArray;
}

let shuffled = shuffleNumbers.bind(null, dialNumberArray);
shuffled();

passwordInputsContainer.addEventListener("keyup", function (e) {
  handleInput(e.key);
});

clearButton.addEventListener(`click`, clearAllInputs);

inputContainer.addEventListener("click", function (ev) {
  let clickedNumber = ev.target.closest("span");
  if (!clickedNumber) return;
  handleInput(clickedNumber.textContent);
});
tryAgainButton.addEventListener("click", resetAll);
// shuffle timer functionality
let timer = 2 * 1000;
setInterval(() => {
  shuffled();
}, timer);
