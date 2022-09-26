const playerXclass = "x";
const playerOclass = "circle";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.getElementById("winningMessageText");
let isPlayerOturn = false;

restartButton.addEventListener("click", startGame);

function startGame() {
  isPlayerOturn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(playerXclass);
    cell.classList.remove(playerOclass);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

startGame();

function setBoardHoverClass() {
  boardElement.classList.remove(playerXclass);
  boardElement.classList.remove(playerOclass);
  if (isPlayerOturn) {
    boardElement.classList.add(playerOclass);
  } else {
    boardElement.classList.add(playerXclass);
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isPlayerOturn ? playerOclass : playerXclass;

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function swapTurns() {
    isPlayerOturn = !isPlayerOturn;
  }

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML = "It's a draw.";
  } else {
    winningMessageTextElement.innerHTML = `${isPlayerOturn ? "O" : "X"} wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(playerXclass) ||
      cell.classList.contains(playerOclass)
    );
  });
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
