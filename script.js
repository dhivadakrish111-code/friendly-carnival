document.addEventListener("DOMContentLoaded", () => {

    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const gameScreen = document.getElementById("gameScreen");
    const resultScreen = document.getElementById("resultScreen");
    const resultText = document.getElementById("resultText");
    const restartBtn = document.getElementById("restartBtn");

    let currentPlayer = "X";
    let gameActive = true;
    let board = ["", "", "", "", "", "", "", "", ""];

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(cell, index));
    });

    restartBtn.addEventListener("click", resetGame);

    function handleCellClick(cell, index) {
        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkResult();
    }

    function checkResult() {
        for (let condition of winConditions) {
            const [a, b, c] = condition;

            if (board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]) {

                cells[a].classList.add("win");
                cells[b].classList.add("win");
                cells[c].classList.add("win");

                gameActive = false;

                setTimeout(() => {
                    showResult('Player  Wins!');
                }, 800);

                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            setTimeout(() => {
                showResult("It's a Draw!");
            }, 800);
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = 'Player Turn';
    }

    function showResult(message) {
        gameScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");
        resultText.textContent = message;
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;

        cells.forEach(cell => {
            cell.textContent = "";
             cell.classList.remove("win");
        });

        statusText.textContent ='Player  Turn';
    }

    
    window.newGame = function () {
        resetGame();
        resultScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
    };

});