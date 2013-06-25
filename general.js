// General game controls

function setup(gameX, gameY, gameW, gameH, gameColor, gameFPS) {
    setup = {x: gameX, y: gameY, w: gameW, h: gameH, color: gameColor, fps: gameFPS};
    canvas = document.getElementById('canvas').getContext("2d");
    canvas.imageSmoothingEnabled = false;
    enableTouchInput();
}

function run() {
    gameRunning = setInterval(gameLoop, 1000 / setup.fps);
}

function pause() {
    clearInterval(gameRunning);
}