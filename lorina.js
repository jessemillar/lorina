ejecta.include('engine/audio.js');
ejecta.include('engine/collision.js');
ejecta.include('engine/draw.js');
ejecta.include('engine/effects.js');
ejecta.include('engine/grid.js');
ejecta.include('engine/groups.js');
ejecta.include('engine/map.js');
ejecta.include('engine/object.js');
ejecta.include('engine/text.js');
ejecta.include('engine/touch.js');

// Timer code
/*
    if(typeof timerName === 'undefined'){
        // Code
    };
*/

function setup(gameColor, smoothPixels) {
    setup = {x: 0, y: 0, width: screen.availWidth, height: screen.availHeight, color: gameColor};
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
    // Check if the images are ready
    if (imagesLoaded) {
        gameRunning = setInterval(game, 1000 / 60);
    } else {
        // Loading bar
    }
}

function pause() {
    clearInterval(gameRunning);
}

function log(logString) {
    console.log(logString);
}

function preload(imageArray) {
    for (imageArray.length) {
        var spriteReference = new Image();
        spriteReference.src = objectSprite;
    }
}