l.touch = new Object() // Group the touch-related functions

l.touch.database = new Array() // Keep track of where we're touching on the screen

l.touch.enable = function()
{
    document.addEventListener('touchstart', function(event) { l.touch.touches(event) })
    document.addEventListener('touchmove', function(event) { l.touch.touches(event) })
    document.addEventListener('touchend', function(event) { l.touch.touches(event) })
    document.addEventListener('touchcancel', function(event) { l.touch.touches(event) })
}

l.touch.touches = function(event)
{
    if (event)
    {
        l.touch.database = event.touches
        l.touch.debug()
    }
    else
    {
        l.touch.database.length = 0
    }
}

l.touch.touched = function(name)
{
    if (l.touch.database.length > 0)
    {
        for (var i = 0; i < l.touch.database.length; i++)
        {
            if (l.touch.database[i].pageX < l.entities[name].bounding.x + l.entities[name].bounding.width && l.touch.database[i].pageX > l.entities[name].bounding.x &&
            l.touch.database[i].pageY < l.entities[name].bounding.y + l.entities[name].bounding.height && l.touch.database[i].pageY > l.entities[name].bounding.y)
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
                if (i == l.touch.database.length - 1)
                {
                    return false
                }
            }
        }
    }
}

l.touch.debug = function()
{
    if (l.debug.all || l.debug.touches && l.touch.database.length > 0)
    {
        for (var i = 0; i < l.touch.database.length; i++)
        {
            console.log('X' + i + ': ' + l.touch.database[i].pageX + ' Y' + i + ': ' + l.touch.database[i].pageY)
        }
    }
}