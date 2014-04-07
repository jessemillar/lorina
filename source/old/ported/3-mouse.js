l.mouse = new Object() // Group the click-related functions

l.mouse.clicks = new Object() // Keep track of where we click

l.mouse.enable = function()
{
    document.onmousemove = l.mouse.moved
    l.dom.setAttribute('onmousedown', 'l.mouse.clicked(event)')
    l.dom.setAttribute('onmouseup', 'l.mouse.cancel()')
}

l.mouse.moved = function(event)
{
    if (event)
    {
        l.mouse.x = event.clientX - l.dom.offsetLeft + l.entities.camera.x
        l.mouse.y = event.clientY - l.dom.offsetTop + l.entities.camera.y
        if (l.mouse.x < 0 || l.mouse.x > l.camera.width || l.mouse.y < 0 || l.mouse.y > l.camera.height)
        {
            l.mouse.x = null
            l.mouse.y = null
        }
        l.mouse.debug()
    }
}

l.mouse.clicked = function(event)
{
    if (event)
    {
        l.mouse.clicked.x = event.x - l.dom.offsetLeft
        l.mouse.clicked.y = event.y - l.dom.offsetTop
        l.mouse.debug()
    }
}

l.mouse.cancel = function(event)
{
    l.mouse.clicked.x = null
    l.mouse.clicked.y = null
    l.mouse.debug()
}

l.mouse.debug = function()
{
    if (l.debug.mouse || l.debug.all)
    {
        if (l.mouse.x && l.mouse.y)
        {
            console.log('Mouse at X: ' + l.mouse.x + ' Y: ' + l.mouse.y)
        }

        if (l.mouse.clicked.x && l.mouse.clicked.y)
        {
            console.log('Click at X: ' + l.mouse.clicked.x + ' Y: ' + l.mouse.clicked.y)
        }
    }
}