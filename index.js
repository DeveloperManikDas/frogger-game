const squares = Array.from(document.querySelectorAll(".game div"));
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#startPauseButton");
let currentIndex = 76;
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");
const classes = ["c1", "c2", "c3"];
let timerId;

carsLeft.forEach((element, index) => {
  element.classList.add(classes[index % classes.length]);
});

carsRight.forEach((element, index) => {
  element.classList.add(classes[index % classes.length]);
});

function moveFrog(event) {
  switch (event.key) {
    case "ArrowLeft":
      console.log("left arrow was pressed");
      if (currentIndex % 9 !== 0) {
        squares[currentIndex].classList.remove("frog");
        squares[currentIndex - 1].classList.add("frog");
        currentIndex -= 1;
      }
      break;
    case "ArrowRight":
      console.log("right arrow was pressed");
      if ((currentIndex - 8) % 9 !== 0) {
        squares[currentIndex].classList.remove("frog");
        squares[currentIndex + 1].classList.add("frog");
        currentIndex += 1;
      }
      break;
    case "ArrowUp":
      console.log("Up arrow was pressed");
      if (!(currentIndex >= 0 && currentIndex <= 8)) {
        squares[currentIndex].classList.remove("frog");
        squares[currentIndex - 9].classList.add("frog");
        currentIndex -= 9;
      }
      break;
    case "ArrowDown":
      console.log("down arrow was pressed");
      if (!(currentIndex >= 72 && currentIndex <= 80)) {
        squares[currentIndex].classList.remove("frog");
        squares[currentIndex + 9].classList.add("frog");
        currentIndex += 9;
      }
      break;

    default:
      break;
  }
}

function moveLogsleft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;

    default:
      break;
  }
}

function moveLogsRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;

    default:
      break;
  }
}

function moveCarsLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");
      break;
    default:
      break;
  }
}

function moveCarsRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
    default:
      break;
  }
}

document.addEventListener("keyup", moveFrog);

function autoMoveElements() {
  lose();
  win();
  logsLeft.forEach((logLeft) => moveLogsleft(logLeft));
  logsRight.forEach((logRight) => moveLogsRight(logRight));
  carsLeft.forEach((carLeft) => moveCarsLeft(carLeft));
  carsRight.forEach((carRight) => moveCarsRight(carRight));
}


function lose() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5")
  ) {
    alert("You lose!!");
    clearInterval(timerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  }
}
function win() {
  if (squares[currentIndex].classList.contains("end")) {
    alert("You won!!");
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
  }
}

startPauseButton.addEventListener("click", () => {
  if (timerId) {
    clearTimeout(timerId);
  } else {
    squares[currentIndex].classList.remove("frog");
    currentIndex = 76;
    squares[currentIndex].classList.add("frog");
    timerId = setInterval(autoMoveElements, 1000);
  }
});
