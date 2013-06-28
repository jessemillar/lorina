function audio(fileName, fileLocation) {
    window[fileName] = new Audio(fileLocation);
}

// Play audio once and reset upon sound completion

function play(audioFile) {
    audioFile.currentTime = 0;
    audioFile.play();
}

function loop(audioFile) {
    if (audioFile.paused) {
        audioFile.loop = true;
        audioFile.play();
    }
}

function mute(audioFile) {
    if (!audioFile.paused) {
        audioFile.pause();
    }
}