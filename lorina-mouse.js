l.mouse = new Object() // Group the click-related functions

l.mouse.clicks = new Object() // Keep track of where we click

l.mouse.enable = function()
{
    l.dom.setAttribute('onmousedown', 'l.mouse.clicked(event)')
    l.dom.setAttribute('onmouseup', 'l.mouse.cancel()')
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
    if (l.game.debug && l.mouse.clicked.x && l.mouse.clicked.y)
    {
        console.log('X: ' + l.mouse.clicked.x + ' Y: ' + l.mouse.clicked.y)
    }
}