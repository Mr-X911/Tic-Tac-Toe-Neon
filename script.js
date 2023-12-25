document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const message = document.getElementById("message");
  const resetBtn = document.getElementById("resetBtn");
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  function createBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-index", i);
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    }
  }

  function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");
    if (gameBoard[index] === "") {
      gameBoard[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      event.target.classList.add(currentPlayer === "X" ? "neon-text-x" : "neon-text-o");
      if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        disableBoard();
      } else if (gameBoard.every(cell => cell !== "")) {
        message.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
  }

  function disableBoard() {
    board.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", handleCellClick));
  }

  function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message.textContent = "Player X's turn";
    board.innerHTML = "";
    createBoard();
    board.querySelectorAll(".cell").forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("neon-text-x", "neon-text-o");
    });
  }

  createBoard();
  resetBtn.addEventListener("click", resetGame);
});
