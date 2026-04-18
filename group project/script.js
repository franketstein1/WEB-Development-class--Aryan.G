const board = document.getElementById("board");
const moveCountEl = document.getElementById("move-count");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");
const messageEl = document.getElementById("message");
const bestScoreEl = document.getElementById("best-score");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const totalPairs = numbers.length;

let deck = [];
let flippedCards = [];
let matchedCount = 0;
let moveCount = 0;
let timerInterval = null;
let secondsElapsed = 0;
let isBoardLocked = false;
let isFirstClick = true;

function lintPad(value) {
  return value.toString().padStart(2, "0");
}

function setTimerDisplay() {
  const mins = Math.floor(secondsElapsed / 60);
  const secs = secondsElapsed % 60;
  timerEl.textContent = `${lintPad(mins)}:${lintPad(secs)}`;
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    secondsElapsed += 1;
    setTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function updateBestScore() {
  const existing = JSON.parse(localStorage.getItem("memoryBestScore") || "null");
  const current = { moves: moveCount, time: secondsElapsed };

  if (!existing || current.moves < existing.moves || (current.moves === existing.moves && current.time < existing.time)) {
    localStorage.setItem("memoryBestScore", JSON.stringify(current));
  }
}

function showBestScore() {
  const best = JSON.parse(localStorage.getItem("memoryBestScore") || "null");
  if (!best) {
    bestScoreEl.textContent = "--";
  } else {
    bestScoreEl.textContent = `${best.moves} moves, ${lintPad(Math.floor(best.time / 60))}:${lintPad(best.time % 60)}`;
  }
}

function showMessage(text, type = "win") {
  messageEl.textContent = text;
  messageEl.className = "message";
  if (type === "win") {
    messageEl.style.background = "rgba(75, 200, 120, 0.95)";
  } else {
    messageEl.style.background = "rgba(200, 50, 50, 0.95)";
  }
  messageEl.classList.remove("hidden");
}

function hideMessage() {
  messageEl.classList.add("hidden");
}

function shuffle(array) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildDeck() {
  const doubled = [...numbers, ...numbers];
  console.log('Building deck with numbers:', numbers);
  console.log('Doubled deck:', doubled);
  deck = shuffle(doubled);
  console.log('Shuffled deck:', deck);
}

function renderBoard() {
  console.log('Rendering board with deck:', deck);
  board.innerHTML = "";
  deck.forEach((symbol, index) => {
    const card = document.createElement("button");
    card.className = "card";
    card.setAttribute("data-symbol", symbol);
    card.setAttribute("aria-label", "Memory card");
    card.setAttribute("type", "button");

    const front = document.createElement("div");
    front.className = "face front";
    front.textContent = symbol;

    const back = document.createElement("div");
    back.className = "face back";
    back.textContent = "?";

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", handleCardClick);
    board.appendChild(card);
  });
  console.log('Board rendered with', board.children.length, 'cards');
}

function checkForWin() {
  if (matchedCount === totalPairs) {
    stopTimer();
    updateBestScore();
    showBestScore();
    showMessage(`Perfect! You matched all pairs in ${moveCount} moves and ${lintPad(Math.floor(secondsElapsed / 60))}:${lintPad(secondsElapsed % 60)}!`);
  }
}

function incrementMoves() {
  moveCount += 1;
  moveCountEl.textContent = moveCount;
}

function resetState(flipBack = false) {
  isBoardLocked = false;
  if (flipBack) {
    flippedCards.forEach((card) => card.classList.remove("flipped"));
  }
  flippedCards = [];
}

function handleCardClick(event) {
  console.log('Card clicked:', event.currentTarget);
  if (isBoardLocked) {
    console.log('Board is locked, ignoring click');
    return;
  }

  const card = event.currentTarget;
  if (card.classList.contains("flipped") || card.classList.contains("matched")) {
    console.log('Card already flipped or matched, ignoring');
    return;
  }

  if (isFirstClick) {
    isFirstClick = false;
    startTimer();
    hideMessage();
  }

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    const firstSymbol = first.dataset.symbol;
    const secondSymbol = second.dataset.symbol;
    console.log('Checking match:', firstSymbol, 'vs', secondSymbol);

    incrementMoves();

    if (firstSymbol === secondSymbol) {
      console.log('Match found!');
      first.classList.add("matched");
      second.classList.add("matched");
      matchedCount += 1;
      resetState(false);
      checkForWin();
    } else {
      console.log('No match, flipping back');
      isBoardLocked = true;
      setTimeout(() => {
        resetState(true);
      }, 900);
    }
  }
}

function resetGame() {
  matchedCount = 0;
  moveCount = 0;
  secondsElapsed = 0;
  isBoardLocked = false;
  isFirstClick = true;
  moveCountEl.textContent = moveCount;
  timerEl.textContent = "00:00";
  hideMessage();
  stopTimer();
  buildDeck();
  renderBoard();
}

restartBtn.addEventListener("click", resetGame);

function init() {
  showBestScore();
  resetGame();
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  console.log('Memory game initializing...');
  console.log('Board element:', board);
  console.log('Restart button:', restartBtn);
  init();
});
