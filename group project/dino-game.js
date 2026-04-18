const dinoEl = document.getElementById("dino");
const obstaclesContainer = document.getElementById("obstacles-container");
const scoreEl = document.getElementById("dino-score");
const highScoreEl = document.getElementById("dino-high-score");
const gameStatusEl = document.getElementById("game-status");
const restartBtn = document.getElementById("dino-restart-btn");
const pauseBtn = document.getElementById("dino-pause-btn");
const gameArea = document.getElementById("dino-game-area");

let dinoPos = 50;
let isJumping = false;
let jumpVelocity = 0;
const jumpPower = 15;
const gravity = 0.5;
const groundLevel = 50;

let score = 0;
let highScore = localStorage.getItem("dinoHighScore") || 0;
let gameRunning = false;
let gamePaused = false;
let gameSpeed = 5;
let obstacleCounter = 0;

highScoreEl.textContent = highScore;

function loadHighScore() {
  highScore = parseInt(localStorage.getItem("dinoHighScore") || "0");
  highScoreEl.textContent = highScore;
}

function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("dinoHighScore", highScore);
    highScoreEl.textContent = highScore;
  }
}

function jump() {
  console.log('Jump function called');
  if (!isJumping && gameRunning && !gamePaused) {
    console.log('Starting jump, dinoPos:', dinoPos);
    isJumping = true;
    jumpVelocity = jumpPower;
  } else {
    console.log('Jump blocked - isJumping:', isJumping, 'gameRunning:', gameRunning, 'gamePaused:', gamePaused);
  }
}

function updateDinoPosition() {
  if (isJumping) {
    jumpVelocity -= gravity;
    dinoPos -= jumpVelocity;

    if (dinoPos >= groundLevel) {
      dinoPos = groundLevel;
      isJumping = false;
      jumpVelocity = 0;
      console.log('Dino landed');
    }
  }

  dinoEl.style.bottom = dinoPos + "%";
}

function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";
  obstacle.style.left = "100%";
  obstacle.style.bottom = groundLevel + "%";

  obstaclesContainer.appendChild(obstacle);

  let obstaclePos = 100;
  const moveInterval = setInterval(() => {
    if (!gamePaused && gameRunning) {
      obstaclePos -= gameSpeed;
      obstacle.style.left = obstaclePos + "%";

      // Check collision
      if (checkCollision(obstacle)) {
        endGame();
        clearInterval(moveInterval);
        return;
      }

      if (obstaclePos < -5) {
        obstacle.remove();
        score += 10;
        scoreEl.textContent = score;
        clearInterval(moveInterval);
      }
    }
  }, 20);
}

function checkCollision(obstacle) {
  const dinoRect = dinoEl.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  return !(
    dinoRect.right < obstacleRect.left ||
    dinoRect.left > obstacleRect.right ||
    dinoRect.bottom < obstacleRect.top ||
    dinoRect.top > obstacleRect.bottom
  );
}

function gameLoop() {
  if (gameRunning && !gamePaused) {
    updateDinoPosition();

    // Increase difficulty over time
    if (score % 50 === 0 && score > 0 && gameSpeed < 10) {
      gameSpeed += 0.5;
    }
  }

  requestAnimationFrame(gameLoop);
}

function startGame() {
  console.log('Starting dino game');
  gameRunning = true;
  gamePaused = false;
  score = 0;
  gameSpeed = 5;
  scoreEl.textContent = score;
  gameStatusEl.textContent = "Game Running!";
  obstaclesContainer.innerHTML = "";
  dinoPos = groundLevel;
  dinoEl.style.bottom = dinoPos + "%";

  pauseBtn.textContent = "Pause";

  // Spawn obstacles
  const spawnInterval = setInterval(() => {
    if (gameRunning && !gamePaused) {
      createObstacle();
    }
    if (!gameRunning) {
      clearInterval(spawnInterval);
    }
  }, 1500 - (score / 100) * 200);

  gameLoop();
}

function endGame() {
  gameRunning = false;
  gamePaused = false;
  saveHighScore();
  gameStatusEl.textContent = `Game Over! Final Score: ${score}`;
  pauseBtn.textContent = "Pause";
  obstaclesContainer.innerHTML = "";
}

function togglePause() {
  if (!gameRunning) return;

  gamePaused = !gamePaused;
  pauseBtn.textContent = gamePaused ? "Resume" : "Pause";
  gameStatusEl.textContent = gamePaused
    ? "Game Paused"
    : "Game Running!";
}

function resetGame() {
  gameRunning = false;
  gamePaused = false;
  score = 0;
  gameSpeed = 5;
  obstacleCounter = 0;
  scoreEl.textContent = score;
  gameStatusEl.textContent = "Press SPACE or Click to Start";
  obstaclesContainer.innerHTML = "";
  dinoPos = groundLevel;
  dinoEl.style.bottom = dinoPos + "%";
  dinoEl.textContent = "◀▶";
  pauseBtn.textContent = "Pause";
}

// Event listeners
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (!gameRunning) {
      startGame();
    } else {
      jump();
    }
  }
});

gameArea.addEventListener("click", () => {
  if (!gameRunning) {
    startGame();
  } else {
    jump();
  }
});

restartBtn.addEventListener("click", () => {
  resetGame();
  startGame();
});

pauseBtn.addEventListener("click", togglePause);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('Dino game initializing...');
  console.log('Dino element:', dinoEl);
  console.log('Game area:', gameArea);
  loadHighScore();
  resetGame();
});
