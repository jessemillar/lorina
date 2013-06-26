function loadAudio(fileName, fileLocation) {
    window[fileName] = new Audio(fileLocation);
}

function playAudio(audioFile) {
    if (window[audioFile].ended == true) {
        window[audioFile].pause();
    }
    if (window[audioFile].paused) {
        window[audioFile].play();
    }
}

function loopAudio(audioFile) {
    if (window[audioFile].paused) {
        window[audioFile].loop = true;
        window[audioFile].play();
    }
}

function stopAudio(audioFile) {
    if (!window[audioFile].paused) {
        window[audioFile].pause();
    }
}