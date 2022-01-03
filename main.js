"use strict";

const CHARACTER_SIZE = 40;

const field = document.querySelector(".game__field");
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const fieldRect = field.getBoundingClientRect();
const popUp = document.querySelector(".pop-up");
const popUpMsg = document.querySelector(".pop-up__message");
const Refresh = document.querySelector(".pop-up__refresh");
const picked = new Audio("./sound/o.mp3");
const bgSound = new Audio("./sound/background.wav");

let score = 1;
let started = false;
let timer = undefined;
gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

field.addEventListener("click", catchCharacter);

Refresh.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  init();
  pauseButton();
  hideGameButton();
  showTimer();
  startTimer();
  hidePopUp();
  playMusic(bgSound);
}

function stopGame() {
  started = false;
  stopMusic(bgSound);
  showPopUp();
  hideGameButton();
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  showPopUp(win ? "YOU LOSE..." : "CONGRATULATION!!");
  stopMusic(bgSound);
}

function startTimer() {
  let playTime = 10;

  updateTimer(playTime);
  timer = setInterval(() => {
    if (playTime <= 0) {
      clearInterval(timer);
      finishGame(score);
      return;
    }
    updateTimer(--playTime);
  }, 1000);
}

function catchCharacter(e) {
  if (!started) {
    return;
  }
  if (e.target.matches(".item")) {
    e.target.remove();
    playMusic(picked);
    --score;
    if (score === 0) {
      finishGame(score);
    }
  }
}

function updateTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function stopGameTimer() {
  clearInterval(timer);
}

function showTimer() {
  gameTimer.style.visibility = "visible";
}

function pauseButton() {
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showPopUp(text) {
  popUpMsg.innerText = text;
  popUp.classList.remove("pop-up--hide");
}

function hidePopUp() {
  popUp.classList.add("pop-up--hide");
}

function playMusic(sound) {
  sound.play();
}

function stopMusic(sound) {
  sound.pause();
}

function init() {
  field.innerHTML = "";
  createItem();
}

//윌리 생성
function createItem() {
  //좌표 받기
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CHARACTER_SIZE;
  const y2 = fieldRect.height - (CHARACTER_SIZE + 24);

  const item = document.createElement("img");
  item.setAttribute("class", "item");
  item.setAttribute("src", "img/character.png");
  //item을 0,0 좌표에서 랜덤위치에 배치
  item.style.position = "absolute";
  const x = randomNum(x1, x2);
  const y = randomNum(y1, y2);
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;
  field.appendChild(item);
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}
