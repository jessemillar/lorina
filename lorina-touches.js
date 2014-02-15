l.touches = new Object() // Group the touch-related functions

l.touches.database = new Array() // Keep track of where we're touching on the screen

l.touches.enable = function()
{
    l.dom.addEventListener('touchstart', l.touches.touched(event), false)
    l.dom.addEventListener('touchmove', l.touches.touched(event), false)
    l.dom.addEventListener('touchend', l.touches.cancel(), false)
    l.dom.addEventListener('touchcancel', l.touches.cancel(), false)
}

l.touches.touched = function(event)
{
    if (event)
    {
        l.touches.database = event.touches
        l.touches.debug()
    }
}

l.touches.cancel = function(event)
{
    l.touches.database.length = 0
    l.touches.debug()
}

l.touches.debug = function()
{
    if (l.game.debug && l.touches.database.length > 0)
    {
        for (var i = 0; i < l.touches.database.length; i++)
        {
            console.log('X' + i = ': ' + l.touches.database[i].clientX + ' Y' + i + ': ' + l.touches.database[i].clientY)
        }
    }
}