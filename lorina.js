var l = new Object() // The Lorina object that keeps the engine functions out of the way

l.game = new Object() // Group the game functions

l.debug = new Object() // Keep track of the various debug options

l.game.setup = function(gameColor)
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

l.game.start = function()
{
    l.game.loop = setInterval(game, 1000 / 60)
}

l.game.pause = function() // Only works once the game is running; no effect during loading or setup
{
    clearInterval(l.loop)
}