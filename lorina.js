ejecta.include('engine/audio.js');
ejecta.include('engine/collision.js');
ejecta.include('engine/draw.js');
ejecta.include('engine/effects.js');
ejecta.include('engine/groups.js');
ejecta.include('engine/map.js');
ejecta.include('engine/object.js');
ejecta.include('engine/text.js');
ejecta.include('engine/touch.js');

function setup(gameX, gameY, gameW, gameH, gameColor, gameFPS, gameScale, smoothPixels) {
    setup = {x: gameX, y: gameY, w: gameW, h: gameH, color: gameColor, fps: gameFPS, scale: gameScale};
    dom = document.getElementById('canvas');
    if (smoothPixels == 'smooth') {
        dom.MSAAEnabled = true;
        dom.MSAASamples = 4;
    } else if (smoothPixels == 'rough'){
        dom.MSAAEnabled = false;
    }
    ctx = document.getElementById('canvas').getContext('2d');
    if (smoothPixels == 'smooth') {
        ctx.imageSmoothingEnabled = true;
    } else if (smoothPixels == 'rough'){
        ctx.imageSmoothingEnabled = false;
    }
    enableTouch();
}

function run() {
    gameRunning = setInterval(game, 1000 / setup.fps);
}

function pause() {
    clearInterval(gameRunning);
}