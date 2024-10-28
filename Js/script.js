const message = document.querySelector(".message");
const boxes = document.querySelectorAll(".box");
const restart = document.querySelector(".restart");
const boxOption = ["", "", "", "", "", "", "", "", ""];
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const user = "❌";
const machine = "⭕";
let current = user;
let running = false;

gameStart();

function gameStart() {
  boxes.forEach((box) => box.addEventListener("click", selectBox));
  restart.addEventListener("click", restartGame);
  running = true;
}

function selectBox() {
  const position = this.getAttribute("id");
  if (boxOption[position] !== "" || !running) {
    return;
  }
  changeBox(this, position);
  checkWinner();

  if (running && current === machine) {
    machineTurn();
  }
}

function machineTurn() {
  running = false;

  setTimeout(() => {
    const emptyPositions = boxOption.reduce((acc, val, idx) => {
      if (val === "") acc.push(idx);
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyPositions.length);
    const position = emptyPositions[randomIndex];

    const box = document.getElementById(position.toString());
    changeBox(box, position);

    running = true;
    checkWinner();
  }, 500);
}

function changeBox(box, position) {
  boxOption[position] = current;
  box.textContent = current;
}

function changeTurn() {
  current = current === user ? machine : user;
}

function checkWinner() {
  let win = false;
  for (let i = 0; i < wins.length; i++) {
    const thisBox = wins[i];
    const Box1 = boxOption[thisBox[0]];
    const Box2 = boxOption[thisBox[1]];
    const Box3 = boxOption[thisBox[2]];
    if (Box1 === "" || Box2 === "" || Box3 === "") {
      continue;
    }
    if (Box1 === Box2 && Box2 === Box3) {
      win = true;
      break;
    }
  }

  if (win) {
    if (current === user) {
      message.textContent = "You win!";
    } else if (current === machine) {
      message.textContent = "The machine won! Try again!";
    }
    running = false;
  } else if (!boxOption.includes("")) {
    message.textContent = "Draw! Try again!";
    running = false;
  } else {
    changeTurn();
  }
}

function restartGame() {
  current = user;
  boxOption.fill("");
  boxes.forEach((box) => (box.textContent = ""));
  message.textContent = "";
  running = true;
}
