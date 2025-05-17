const board = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let running = true;

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusText.innerText = `Player ${currentPlayer} Wins!`;
            running = false;
            return;
        }
    }

    if (!gameBoard.includes("")) {
        statusText.innerText = "It's a Tie!";
        running = false;
    }
};

const cellClick = (event) => {
    const index = event.target.dataset.index;
    if (gameBoard[index] || !running) return;

    gameBoard[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const resetGame = () => {
    gameBoard.fill("");
    board.forEach(cell => cell.innerText = "");
    statusText.innerText = "";
    currentPlayer = "X";
    running = true;
};

board.forEach(cell => cell.addEventListener("click", cellClick));