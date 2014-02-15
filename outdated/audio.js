function audio(fileName, fileLocation) {
    window[fileName] = new Audio(fileLocation);
}

// Play audio once and reset upon sound completion

function play(audioFile, playVolume) {
    if (playVolume == null) {
        audioFile.volume = 0;
    } else {
        audioFile.volume = playVolume;
    }
    audioFile.currentTime = 0;
    audioFile.play();
}

function loop(audioFile, playVolume) {
    if (audioFile.paused) {
        if (playVolume == null) {
            audioFile.volume = 0;
        } else {
            audioFile.volume = playVolume;
        }
        audioFile.volume = playVolume;
        audioFile.loop = true;
        audioFile.play();
    }
}

function mute(audioFile) {
    if (!audioFile.paused) {
        audioFile.pause();
    }
}