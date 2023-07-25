const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const cells = document.getElementsByClassName('cell');
let gameOver = false;
let playerXScore = 0;
let playerOScore = 0;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function makeMove(cellIndex) {
    if (!gameOver && board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        const cell = cells[cellIndex];
        cell.innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (currentPlayer === 'O' && !gameOver) {

            setTimeout(makeAIMove, 500);
        }
    }
}

function resetScores() {
    playerXScore = 0;
    playerOScore = 0;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    document.getElementById('playerXScore').textContent = playerXScore;
    document.getElementById('playerOScore').textContent = playerOScore;
}

function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            const winner = board[a];
            const modal = document.getElementById('modal');
            const modalImage = document.getElementById('modal-image');

            if (winner === 'X') {
                modalImage.src = '/images/xWins.png';
                playerXScore++;
            } else if (winner === 'O') {
                modalImage.src = '/images/oWins.png';
                playerOScore++;
            }

            updateScoreDisplay();
            modal.style.display = 'block';
            return;
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');

        modalImage.src = '/images/tie.png';
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    resetBoard();
}

function resetBoard() {
    board.fill('');
    currentPlayer = 'X';
    gameOver = false;
    const cellsArray = Array.from(cells);
    cellsArray.forEach(cell => cell.innerText = '');
    printBoard();
}

function getRandomAvailableCell() {
    const availableCells = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            availableCells.push(i);
        }
    }
    if (availableCells.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    return availableCells[randomIndex];
}

function makeAIMove() {
    const cellIndex = getRandomAvailableCell();
    if (cellIndex !== null) {
        makeMove(cellIndex);
    }
}

function printBoard() {
    console.clear();
    console.log(` ${board[0]} | ${board[1]} | ${board[2]} `);
    console.log('-----------');
    console.log(` ${board[3]} | ${board[4]} | ${board[5]} `);
    console.log('-----------');
    console.log(` ${board[6]} | ${board[7]} | ${board[8]} `);
}

document.getElementById('board').addEventListener('click', function (event) {
    const cellIndex = [...cells].indexOf(event.target);
    makeMove(cellIndex);
});


updateScoreDisplay();
printBoard();
