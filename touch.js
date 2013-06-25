// Touch input

touched = null;
touchDatabase = new Array();

function enableTouchInput() {
    document.addEventListener("touchstart", handleStart, false);
    document.addEventListener("touchmove", handleMove, false);
    document.addEventListener("touchend", handleEnd, false);
    document.addEventListener("touchcancel", handleCancel, false);
}

function handleStart(event) {
    touched = true;
    touchDatabase = event.touches;
}

function handleMove(event) {
    touched = true;
    touchDatabase = event.touches;
}

function handleEnd(event) {
    touched = null;
}

function handleCancel(event) {
    touched = null;
}

function drawTouches() {
    if (touched) {
        // Loop through and catch all touch events (five on iPhone and ten on iPad)
        for (var i = 0; i < touchDatabase.length; i++) {
            var touch = touchDatabase[i];
            canvas.beginPath();
            canvas.strokeStyle = "#00FFFF";
            canvas.lineWidth = 3;
            canvas.arc(touch.clientX, touch.clientY, 45, 0, Math.PI * 2, true);
            canvas.stroke();
        }
    }
}