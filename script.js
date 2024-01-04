"use strict";
const inputContainer = document.querySelector(".input");
const passwordInputs = document.querySelectorAll(`input`);
let passwordInputsContainer = document.querySelector(".output-display");
let activeInputIndex = 0;

// password focus functionality
if (passwordInputs.length > 0) {
  passwordInputs[0].focus();
}
// a little bit if event delegation
passwordInputsContainer.addEventListener("input", function (e) {
  let targetElement = e.target.closest("input");
  if (!targetElement) return;

  // converts the node list to an actual array adn getting the index of the target element, this could be done also by spreading the array or taking a slice.
  let currentIndex = Array.from(passwordInputs).indexOf(targetElement);
  activeInputIndex = currentIndex;

  // add focus on the next input
  if (
    targetElement.value.length > 0 &&
    currentIndex < passwordInputs.length - 1
  ) {
    passwordInputs[currentIndex + 1].focus();
    activeInputIndex = currentIndex + 1;
  }
});

// dial pad shuffle functionality
const dialNumberArray = Array.from({ length: 10 }, (_, item) => item);
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
// number clicks functionality
inputContainer.addEventListener("click", function (ev) {
  let clickedNumber = ev.target.closest("span");
  if (!clickedNumber) return;
  if (activeInputIndex < passwordInputs.length) {
    let activeInput = passwordInputs[activeInputIndex];
    activeInput.value += clickedNumber.textContent;

    if (
      activeInput.value.length > 0 &&
      activeInputIndex < passwordInputs.length - 1
    ) {
      passwordInputs[activeInputIndex + 1].focus();
      activeInputIndex++; // Move to next input
    }
  }
});
// shuffle timer functionality
let timer = 10 * 1000;
setInterval(() => {
  shuffled();
}, timer);
