"use strict";

const CHARACTER_SIZE = 40;

const field = document.querySelector(".game__field");
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const fieldRect = field.getBoundingClientRect();

const picked = new Audio("./sound/o.mp3");

function init() {
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

init();
