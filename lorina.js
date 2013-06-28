ejecta.include('engine/audio.js');
ejecta.include('engine/collision.js');
ejecta.include('engine/draw.js');
ejecta.include('engine/effects.js');
ejecta.include('engine/map.js');
ejecta.include('engine/object.js');
ejecta.include('engine/text.js');
ejecta.include('engine/touch.js');

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