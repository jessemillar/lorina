function audio(fileName, fileLocation) {
    window[fileName] = new Audio(fileLocation);
}

function play(audioFile) {
    if (audioFile.ended == true) {
        audioFile.pause();
    }
    if (audioFile.paused) {
        audioFile.play();
    }
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