const playerRed = "R";
const playerYellow = "Y";
let currentPlayer = playerRed;
let gameOver = false;
let board;
let currentColumns;

const rows = 6;
const columns = 7;

const tileWrapper = document.querySelector("#tile-wrapper");
const markerZero = document.querySelector("#marker-zero");
const markerOne = document.querySelector("#marker-one");
const markerTwo = document.querySelector("#marker-two");
const markerThree = document.querySelector("#marker-three");
const markerFour = document.querySelector("#marker-four");
const markerFive = document.querySelector("#marker-five");
const markerSix = document.querySelector("#marker-six");
const markers = document.querySelectorAll(".marker");

const dataPlayer = document.querySelector("[data-player]");
const dataTimer = document.querySelector("[data-timer]");

const playerCountDownRed = document.querySelector(".player-countdown-red");

const playerOneWins = document.querySelector("#player-one-wins");
const playerTwoWins = document.querySelector("#player-two-wins");

const restartButton = document.querySelector("#restart");
const menuButton = document.querySelector("#rules");
const checkIcon = document.querySelector(".check-icon");
const rules = document.querySelector(".rules");
const boardWrapper = document.querySelector(".board-wrapper");

window.onload = function () {
  setGame();
  rules.classList.add("hidden");
};

function setGame() {
  board = [];
  currentColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      tileWrapper.append(tile);
      tile.addEventListener("mouseenter", (e) => {
        if (gameOver) {
          return;
        } else {
          let id = e.target.id.split("-");

          if (id[1] === "0") {
            markerZero.style.opacity = "1";
          }
          if (id[1] === "1") {
            markerOne.style.opacity = "1";
          }
          if (id[1] === "2") {
            markerTwo.style.opacity = "1";
          }
          if (id[1] === "3") {
            markerThree.style.opacity = "1";
          }
          if (id[1] === "4") {
            markerFour.style.opacity = "1";
          }

          if (id[1] === "5") {
            markerFive.style.opacity = "1";
          }
          if (id[1] === "6") {
            markerSix.style.opacity = "1";
          }
        }
      });
      tile.addEventListener("mouseleave", (e) => {
        let id = e.target.id.split("-");

        if (id[1] === "0") {
          markerZero.style.opacity = "0";
        }
        if (id[1] === "1") {
          markerOne.style.opacity = "0";
        }
        if (id[1] === "2") {
          markerTwo.style.opacity = "0";
        }
        if (id[1] === "3") {
          markerThree.style.opacity = "0";
        }
        if (id[1] === "4") {
          markerFour.style.opacity = "0";
        }

        if (id[1] === "5") {
          markerFive.style.opacity = "0";
        }
        if (id[1] === "6") {
          markerSix.style.opacity = "0";
        }
      });
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  r = currentColumns[c];
  if (r < 0) {
    return;
  }

  board[r][c] = currentPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());

  if (currentPlayer == playerRed) {
    tile.classList.add("red-piece");
    markers.forEach((marker) => {
      marker.classList.remove("marker-red");
      marker.classList.add("marker-yellow");
    });
    playerCountDownRed.classList.add("player-countdown-yellow");
    dataPlayer.innerText = "PLAYER 2'S TURN";

    currentPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    markers.forEach((marker) => {
      marker.classList.remove("marker-yellow");
      marker.classList.add("marker-red");
    });

    playerCountDownRed.classList.remove("player-countdown-yellow");
    playerCountDownRed.classList.add("player-countdown-red");
    dataPlayer.innerText = "PLAYER 1'S TURN";

    currentPlayer = playerRed;
  }

  r -= 1;
  currentColumns[c] = r;

  checkWinner();
}

function setWinner(r, c) {
  if (board[r][c] == playerRed) {
    dataPlayer.innerText = "PLAYER 1";
    dataTimer.innerText = "WINS";
    playerCountDownRed.classList.add("player-countdown-red");
    playerCountDownRed.classList.remove("player-countdown-yellow");
    updatedGameRed();
  } else {
    dataPlayer.innerText = "PLAYER 2";
    dataTimer.innerText = "WINS";
    playerCountDownRed.classList.add("player-countdown-yellow");
    playerTwoScore++;
  }

  gameOver = true;
}

function checkWinner() {
  //horizontally
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          setWinner(r, c);
          markers.forEach((marker) => {
            marker.style.display = "none";
          });
          return;
        }
      }
    }
  }

  //vertically
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //anti diagonally
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //diagonally
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] == board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

restartButton.addEventListener("click", () => {
  gameOver = false;
  window.location.reload();
});

menuButton.addEventListener("click", () => {
  boardWrapper.classList.add("hidden");
  rules.classList.remove("hidden");
});

checkIcon.addEventListener("click", () => {
  rules.classList.add("hidden");
  boardWrapper.classList.remove("hidden");
});
