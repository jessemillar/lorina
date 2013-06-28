function audio(fileName, fileLocation) {
    window[fileName] = new Audio(fileLocation);
}

function play(audioFile) {
    if (window[audioFile].ended == true) {
        window[audioFile].pause();
    }
    if (window[audioFile].paused) {
        window[audioFile].play();
    }
}

function loop(audioFile) {
    if (window[audioFile].paused) {
        window[audioFile].loop = true;
        window[audioFile].play();
    }
}

function mute(audioFile) {
    if (!window[audioFile].paused) {
        window[audioFile].pause();
    }
}