// Touch input

touched = null;
touchDatabase = new Array();

function enableTouch() {
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

function touchDebug() {
    if (touched) {
        // Loop through and catch all touch events (five on iPhone and ten on iPad)
        for (var i = 0; i < touchDatabase.length; i++) {
            var touch = touchDatabase[i];
            log("X: " + touch.clientX + " Y: " + touch.clientY);
        }
    }
}