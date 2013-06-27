// General game controls

function setupGame(gameX, gameY, gameW, gameH, gameColor, gameFPS, gameScale) {
    setup = {x: gameX, y: gameY, w: gameW, h: gameH, color: gameColor, fps: gameFPS, scale: gameScale};
    canvas = document.getElementById('canvas').getContext("2d");
    canvas.imageSmoothingEnabled = false;
    enableTouchInput();
}

function runGame() {
    gameRunning = setInterval(gameLoop, 1000 / setup.fps);
}

function pauseGame() {
    clearInterval(gameRunning);
}