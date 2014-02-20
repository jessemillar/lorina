l.touches = new Object() // Group the touch-related functions

l.touches.database = new Array() // Keep track of where we're touching on the screen

l.touches.enable = function()
{
    document.addEventListener('touchstart', function(event) { l.touches.touches(event) })
    document.addEventListener('touchmove', function(event) { l.touches.touches(event) })
    document.addEventListener('touchend', function(event) { l.touches.touches(event) })
    document.addEventListener('touchcancel', function(event) { l.touches.touches(event) })
}

l.touches.touches = function(event)
{
    if (event)
    {
        l.touches.database = event.touches
        l.touches.debug()
    }
    else
    {
        l.touches.database.length = 0
    }
}

l.touches.touched = function(name)
{
    if (l.touches.database.length > 0)
    {
        for (var i = 0; i < l.touches.database.length; i++)
        {
            if (l.touches.database[i].pageX < l.entities[name].bounding.x + l.entities[name].bounding.width && l.touches.database[i].pageX > l.entities[name].bounding.x &&
            l.touches.database[i].pageY < l.entities[name].bounding.y + l.entities[name].bounding.height && l.touches.database[i].pageY > l.entities[name].bounding.y)
            {
                if (l.debug.all || l.debug.touches)
                {
                    console.log(name + ' was touched')
                }
                return true
                break
            }
            else
            {
                if (i == l.touches.database.length - 1)
                {
                    return false
                }
            }
        }
    }
}

l.touches.debug = function()
{
    if (l.debug.all || l.debug.touches && l.touches.database.length > 0)
    {
        for (var i = 0; i < l.touches.database.length; i++)
        {
            console.log('X' + i + ': ' + l.touches.database[i].pageX + ' Y' + i + ': ' + l.touches.database[i].pageY)
        }
    }
}