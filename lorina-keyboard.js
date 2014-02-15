l.keyboard = new Object() // Group the keyboard functions

l.keyboard.enable = function()
{
    document.body.setAttribute('onkeydown', 'l.keyboard.pressed(event)')
    document.body.setAttribute('onkeyup', 'l.keyboard.cancel(event)')
}

l.keyboard.pressed = function(event)
{
    if (event.keyCode == 13)
    {
        l.keyboard.enter = true
    }

    if (event.keyCode == 16)
    {
        l.keyboard.shift = true
    }

    if (event.keyCode == 65)
    {
        l.keyboard.a = true
    }

    if (event.keyCode == 83)
    {
        l.keyboard.s = true
    }

    if (event.keyCode == 38)
    {
        l.keyboard.up = true
    }

    if (event.keyCode == 40)
    {
        l.keyboard.down = true
    }

    if (event.keyCode == 37)
    {
        l.keyboard.left = true
    }

    if (event.keyCode == 39)
    {
        l.keyboard.right = true
    }

    if (l.debug.keyboard || l.debug.all)
    {
        // console.log(event.keyCode)
        if (l.keyboard.enter)
        {
            console.log('Enter')
        }

        if (l.keyboard.shift)
        {
            console.log('Shift')
        }

        if (l.keyboard.a)
        {
            console.log('A')
        }

        if (l.keyboard.s)
        {
            console.log('S')
        }

        if (l.keyboard.up)
        {
            console.log('Up')
        }

        if (l.keyboard.down)
        {
            console.log('Down')
        }

        if (l.keyboard.left)
        {
            console.log('Left')
        }

        if (l.keyboard.right)
        {
            console.log('Right')
        }
    }
}

l.keyboard.cancel = function()
{
    if (event.keyCode == 13)
    {
        l.keyboard.enter = false
    }

    if (event.keyCode == 16)
    {
        l.keyboard.shift = false
    }

    if (event.keyCode == 65)
    {
        l.keyboard.a = false
    }

    if (event.keyCode == 83)
    {
        l.keyboard.s = false
    }

    if (event.keyCode == 38)
    {
        l.keyboard.up = false
    }

    if (event.keyCode == 40)
    {
        l.keyboard.down = false
    }

    if (event.keyCode == 37)
    {
        l.keyboard.left = false
    }

    if (event.keyCode == 39)
    {
        l.keyboard.right = false
    }
}