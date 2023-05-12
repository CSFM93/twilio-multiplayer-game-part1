const xSign = document.getElementById('XSign');
const OSign = document.getElementById('OSign');
const txtPlayerOScore = document.getElementById('txtPlayerOScore');
const txtPlayerXScore = document.getElementById('txtPlayerXScore');
const modalGameOver = document.getElementById('modalGameOver');
const txtGameStatus = document.getElementById('txtGameStatus');

let playerOScore = 0;
let playerXScore = 0;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let gameWinningCombo = [];

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  indicatePlayerTurn();
}

function indicatePlayerTurn() {
  if (currentPlayer === 'O') {
    OSign.classList.add('blink');
    xSign.classList.remove('blink');
  } else {
    xSign.classList.add('blink');
    OSign.classList.remove('blink');
  }
}

function AIPlayer() {
  const emptyCells = [...cells].filter((cell) => {
    return !cell.classList.contains('X') && !cell.classList.contains('O');
  });
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const randomCell = emptyCells[randomIndex];
  randomCell.setAttribute('disabled', true);

  markCell(randomCell)
}

function checkWin() {
  return winningCombos.some((combo) => {
    return combo.every((index) => {
      if (cells[index].classList.contains(currentPlayer)) {
        gameWinningCombo = combo;
        return true;
      }
    });
  });
}

function checkTie() {
  return [...cells].every((cell) => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function checkGameStatus() {
  if (checkWin()) {
    gameOver('win');
  } else if (checkTie()) {
    gameOver('tie');
  } else {
    switchPlayer();
    if (currentPlayer === AI) {
      setTimeout(() => {
        AIPlayer();
      }, 1000);
    }
  }
}

function gameOver(gameOutcome) {
  if (gameOutcome === 'win') {
    setTimeout(() => {
      currentPlayer === 'O' ? playerOScore += 1 : playerXScore += 1;
      txtPlayerOScore.innerText = playerOScore;
      txtPlayerXScore.innerText = playerXScore;
      showGameOverModal('win');
      gameWinningCombo.forEach((combo) => {
        cells[combo].classList.add('blink');
      });
      btnStart.disabled = false;
    }, 300);
  } else {
    showGameOverModal('tie');
    btnStart.disabled = false;
  }
  isGameOver = true;
}

function showGameOverModal(gameOutcome) {
  if (gameOutcome === 'win') {
    const sign = currentPlayer === 'O' ? '<span class="text-danger"> O </span>'
      : '<span class="text-primary"> X </span>';
    txtGameStatus.innerHTML = `Player ${sign} won`;
  } else {
    txtGameStatus.innerText = "It's a tie";
  }
  
  const modal = new bootstrap.Modal(modalGameOver);
  setTimeout(() => {
    modal.show();
  }, 300);
}

function reset() {
  for (const cell of cells) {
    cell.classList.remove('X');
    cell.classList.remove('O');
    cell.classList.remove('blink');
    cell.replaceChildren([]);
    cell.setAttribute('disabled', false);
  }
  gameWinningCombo = [];
  switchPlayer();
}
