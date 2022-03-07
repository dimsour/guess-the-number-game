'use strict';

function randomNumber() {
  const x = Math.trunc(Math.random() * 20) + 1;
  return x;
}

function winScenario() {
  document.querySelector(`.message`).textContent = `Correct Number! 🎉`;
  document.querySelector(`body`).style.backgroundColor = `#60b347`;
  document.querySelector(`.number`).style.width = `30rem`;
  document.querySelector(`.number`).textContent = secretNumber;
  document.querySelector(`.highscore`).textContent = highscoreCheck();
  document.querySelector(`.check`).disabled = true;
}

function loseScenario() {
  document.querySelector(`.message`).textContent = `You Lost! 😢`;
  document.querySelector(`.score`).textContent = 0;
}

function highscoreCheck() {
  if (score > highScore) highScore = score;
  return highScore;
}

function resetGame() {
  secretNumber = randomNumber();
  score = 20;
  console.log(secretNumber);
  document.querySelector(`body`).style.backgroundColor = `#222`;
  document.querySelector(`.number`).style.width = `15rem`;
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector(`.score`).textContent = score;
  document.querySelector(`.message`).textContent = `Start guessing...`;
  document.querySelector(`.guess`).value = ``;
  document.querySelector(`.check`).disabled = false;
}

function wrongAnswer(messageText) {
  document.querySelector(`.message`).textContent = messageText;
  score--;
  document.querySelector(`.score`).textContent = score;
}

function inputProcess() {
  const guessNumber = Number(document.querySelector('.guess').value);
  // incorect input
  if (!guessNumber || guessNumber > 20 || guessNumber < 0) {
    document.querySelector(
      `.message`
    ).textContent = `No valid number given! ⛔`;
    //when player wins
  } else if (guessNumber === secretNumber) {
    winScenario();
  }
  // when guess is too high
  else if (guessNumber > secretNumber) {
    if (score > 1) {
      wrongAnswer(`Number high! 📈`);
    } else loseScenario();
  }
  //when guess is too low
  else if (guessNumber < secretNumber) {
    if (score > 1) {
      wrongAnswer(`Number low! 📉`);
    } else loseScenario();
  }
}

let secretNumber = randomNumber();
console.log(secretNumber);
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener(`click`, inputProcess);
document.querySelector('.again').addEventListener(`click`, resetGame);
