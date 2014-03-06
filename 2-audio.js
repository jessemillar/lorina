l.audio = new Object() // Group the audio functions
l.audio.files = new Object() // The place where we'll store all the loaded sound files

l.audio.make = function(name, location)
{
    l.preloader.queue()
    l.audio.files[name] = document.createElement('audio')
        l.audio.files[name].src = location
        l.audio.files[name].canPlay = true
    
    if (l.canvas.agent == 'ejecta')
    {
        l.audio.files[name].preload = true
        l.audio.files[name].load()
        document.body.appendChild(l.audio.files[name])
        l.audio.files[name].addEventListener('canplaythrough', function()
        {
            l.preloader.update()
        })
    }
    else
    {
        l.audio.files[name].setAttribute('preload', 'auto')
        l.audio.files[name].onloadeddata = function()
        {
            l.preloader.update()
        }
    }
}

l.audio.pause = function(name)
{
    l.audio.files[name].pause()
}


l.audio.rewind = function(name)
{
    l.audio.files[name].canPlay = true
}

l.audio.play = function(name)
{
    if (l.audio.files[name].canPlay)
    {
        if (l.canvas.agent == 'chrome')
        {
            l.audio.files[name].load()
        }
        l.audio.files[name].play()
        l.audio.files[name].canPlay = false
    }
}

l.audio.loop = function(name)
{
    if (l.audio.files[name].canPlay)
    {
        if (l.canvas.agent == 'chrome')
        {
            l.audio.files[name].load()
        }
        l.audio.files[name].addEventListener('ended', function()
        {
            l.audio.files[name].currentTime = 0
            l.audio.files[name].play()
        }, false)
        l.audio.files[name].play()
        l.audio.files[name].canPlay = false
    }
}