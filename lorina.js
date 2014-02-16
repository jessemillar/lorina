var l = new Object() // The Lorina object that keeps the engine functions out of the way

l.game = new Object() // Group the game functions
l.debug = new Object() // Keep track of the various debug options

l.game.setup = function(gameColor)
{
    l.dom = document.getElementById('canvas')
    l.ctx = document.getElementById('canvas').getContext('2d')

    l.object.make('camera', 0, 0, parseInt(document.getElementById('canvas').width), parseInt(document.getElementById('canvas').height))
    l.object.anchor('camera', parseInt(document.getElementById('canvas').width) / 2, parseInt(document.getElementById('canvas').height) / 2)
    l.entities.camera.color = gameColor
}

l.game.start = function()
{
    l.game.loop = setInterval(game, 1000 / 60)
}

l.game.pause = function() // Only works once the game is running; no effect during loading or setup
{
    clearInterval(l.game.loop)
}

l.camera = new Object() // Group the camera functions

l.camera.follow = function(name, sandboxWidth, sandboxHeight)
{
    if (l.entities[name].anchor.x < l.entities.camera.x + l.entities.camera.width / 2 - sandboxWidth / 2)
    {
        l.entities.camera.x = l.entities[name].anchor.x - l.entities.camera.width / 2 + sandboxWidth / 2
    }
    else if (l.entities[name].anchor.x > l.entities.camera.x + l.entities.camera.width / 2 + sandboxWidth / 2)
    {
        l.entities.camera.x = l.entities[name].anchor.x - l.entities.camera.width / 2 - sandboxWidth / 2
    }

    if (l.entities[name].anchor.y < l.entities.camera.y + l.entities.camera.height / 2 - sandboxHeight / 2)
    {
        l.entities.camera.y = l.entities[name].anchor.y - l.entities.camera.height / 2 + sandboxHeight / 2
    }
    else if (l.entities[name].anchor.y > l.entities.camera.y + l.entities.camera.height / 2 + sandboxHeight / 2)
    {
        l.entities.camera.y = l.entities[name].anchor.y - l.entities.camera.height / 2 - sandboxHeight / 2
    }
}