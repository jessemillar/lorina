// General game controls

function setup(gameX, gameY, gameW, gameH, gameColor, gameFPS, gameScale) {
    setup = {x: gameX, y: gameY, w: gameW, h: gameH, color: gameColor, fps: gameFPS, scale: gameScale};
    canvas = document.getElementById('canvas').getContext("2d");
    canvas.imageSmoothingEnabled = false;
    enableTouchInput();
}

function run() {
    gameRunning = setInterval(game, 1000 / setup.fps);
}

function pause() {
    clearInterval(gameRunning);
}