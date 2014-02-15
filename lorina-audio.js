l.audio = new Object() // Group the audio functions
l.audio.files = new Object() // The place where we'll store all the loaded sound files

l.audio.make = function(name, location)
{
    l.preloader.queue()
    l.audio.files[name] = document.createElement('audio')
        l.audio.files[name].setAttribute('preload', 'auto')
        l.audio.files[name].autobuffer = true
        l.audio.files[name].src = location
        l.audio.files[name].load()
        l.audio.files[name].onloadeddata = function()
        {
            l.preloader.update()
        }
}

l.audio.play = function(name)
{
    l.audio.files[name].currentTime = 0
    l.audio.files[name].play()
}

l.audio.pause = function(name)
{
    l.audio.files[name].pause()
}

/*
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
*/