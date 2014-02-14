// ejecta.include('engine/audio.js');
// ejecta.include('engine/collision.js');
// ejecta.include('engine/draw.js');
// ejecta.include('engine/groups.js');
// ejecta.include('engine/map.js');
// ejecta.include('engine/object.js');
// ejecta.include('engine/preloader.js');
// ejecta.include('engine/text.js');
// ejecta.include('engine/touch.js');

var l = new Object() // The Lorina object that keeps engine functions out of the way

l.setup = function(gameColor)
{
    l.dom = document.getElementById('canvas')
    l.ctx = document.getElementById('canvas').getContext('2d')

    l.camera = new Object()
        l.camera.x = 0
        l.camera.y = 0
        l.camera.width = parseInt(document.getElementById('canvas').width)
        l.camera.height = parseInt(document.getElementById('canvas').height)
        l.camera.color = gameColor
}

l.run = function()
{
    l.loop = setInterval(game, 1000 / 60)
}

l.pause = function() // Only works once the game is running; no effect during loading or setup
{
    clearInterval(l.loop)
}

l.parse = function(string)
{
    return JSON.stringify(string)
}