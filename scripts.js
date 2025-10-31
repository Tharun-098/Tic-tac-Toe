const boardEl = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.reset');

let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let gameActive = true;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// ✅ Step 2: Use ONE event listener (Event Delegation)
boardEl.addEventListener('click', (e) => {
  const cell = e.target;
  
  // make sure it's a valid cell
  if (!cell.classList.contains('cell') || !gameActive) return;

  const index = cell.dataset.index;

  if (board[index] !== "") return;

  board[index] = turn;
  cell.textContent = turn;

  if (checkWinner()) {
    statusText.textContent = `Player ${turn} wins!`;
    gameActive = false;
  } else if (board.every(c => c !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    turn = turn === "X" ? "O" : "X";
    statusText.textContent = `Player ${turn}'s turn`;
  }
});

// Check winner using board array
function checkWinner() {
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

resetBtn.addEventListener('click', () => {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(c => c.textContent = "");
  turn = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
});
