const btnStart = document.getElementById('btnStart');
const cells = document.getElementsByClassName('cell');
const txtPlayerOName = document.getElementById('txtPlayerOName');
const txtPlayerXName = document.getElementById('txtPlayerXName');

let player = 'O';
const AI = 'X';
let currentPlayer = player;
let addedListenersToCells = false;
let isGameOver = false;

function indicatePlayerSign() {
  if (player === 'O') {
    txtPlayerOName.textContent = 'You';
  } else if (player === 'X') {
    txtPlayerXName.textContent = 'You';
  }
}

indicatePlayerSign();

function addListenersToCells() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('mouseover', () => {
      if (currentPlayer === player && !isGameOver && cells[i].children.length === 0) {
        cells[i].classList.add('shrink-grow');
      }
    });

    cells[i].addEventListener('mouseout', () => {
      if (currentPlayer === player && !isGameOver && cells[i].children.length === 0) {
        cells[i].classList.remove('shrink-grow');
      }
    });

    cells[i].addEventListener('click', () => {
      if (currentPlayer === player && !isGameOver && cells[i].children.length === 0) {
        cells[i].setAttribute('disabled', true);
        cells[i].classList.remove('shrink-grow');
        markCell(cells[i]);
      }
    });
  }
}

function markCell(cell) {
  cell.classList.add(currentPlayer);
  const sign = document.createElement('span');
  sign.className = currentPlayer === 'O' ? 'circle' : 'cross';
  cell.appendChild(sign);

  checkGameStatus();
}

btnStart.addEventListener('click', () => {
  startGame();
  if (currentPlayer === AI) {
    setTimeout(() => {
      AIPlayer();
    }, 1000);
  }
});

function startGame() {
  isGameOver = false;

  if (!addedListenersToCells) {
    addListenersToCells();
    addedListenersToCells = true;
  }

  btnStart.disabled = true;
  reset();
}
