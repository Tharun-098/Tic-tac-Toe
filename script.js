const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.reset');

let turn = 'X';
let gameActive = true;
console.log(cells);
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell,index)=>{
    cell.addEventListener('click',()=>{
        if(!cell.textContent===" " || !gameActive) return;
        cell.textContent=turn;
        if(checkWin()){
            statusText.textContent=`Player ${turn} wins!`;
            gameActive=false;
        }
        else if(checkDarw()){
            statusText.textContent="It's a draw!";
            gameActive=false;
        }
        else{
            turn=turn==="X"?"O":"X";
            statusText.textContent=`player ${turn}'s turn`;
        }
    })
})
function checkWin() {
 return winCombos.some(combo=>{
    const [a,b,c]=combo;
    return cells[a].textContent && cells[a].textContent===cells[b].textContent && cells[a].textContent===cells[c].textContent ;
 })   
}
function checkDarw(){
    return [...cells].every(cell=>cell.textContent);
}
resetBtn.addEventListener('click', () => {
  cells.forEach(cell => (cell.textContent = ''));
  turn = 'X';
  gameActive = true;
  statusText.textContent = "Player X's turn";
});
