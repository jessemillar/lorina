l.touches = new Object() // Group the touch-related functions

l.touches.database = new Array() // Keep track of where we're touching on the screen

l.touches.enable = function()
{
    document.addEventListener('touchstart', function(event) { l.touches.touched(event) })
    document.addEventListener('touchmove', function(event) { l.touches.touched(event) })
    document.addEventListener('touchend', function() { l.touches.cancel() })
    document.addEventListener('touchcancel', function() { l.touches.cancel() })
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
    if (l.debug.touches && l.touches.database.length > 0)
    {
        for (var i = 0; i < l.touches.database.length; i++)
        {
            console.log('X' + i + ': ' + l.touches.database[i].pageX + ' Y' + i + ': ' + l.touches.database[i].pageY)
        }
    }
}