var Keyboard = function()
{
    this.enable = function()
    {
        var parent = this

        window.onkeydown = function()
        {
            parent.pressed(event)
        }

        window.onkeyup = function()
        {
            parent.cancel(event)
        }

        return this
    }

    /*
    this.enableExternal = function(object)
    {
        document.body.setAttribute('onkeydown', function(event)
        {
            this.pressed(event)
        })
        // document.body.setAttribute('onkeyup', eval(object.cancel(event)))
    }
    */

    this.pressed = function(event)
    {
        if (event.keyCode == 27)
        {
            this.escape = true
        }

        if (event.keyCode == 32)
        {
            this.space = true
        }

        if (event.keyCode == 13)
        {
            this.enter = true
        }

        if (event.keyCode == 16)
        {
            this.shift = true
        }

        if (event.keyCode == 65)
        {
            this.a = true
        }

        if (event.keyCode == 83)
        {
            this.s = true
        }

        if (event.keyCode == 38)
        {
            this.up = true
        }

        if (event.keyCode == 40)
        {
            this.down = true
        }

        if (event.keyCode == 37)
        {
            this.left = true
        }

        if (event.keyCode == 39)
        {
            this.right = true
        }

        /*
        if (this.debug.keyboard || this.debug.all)
        {
            // console.log(event.keyCode)
            
            if (this.escape)
            {
                console.log('Escape')
            }

            if (this.space)
            {
                console.log('Space')
            }

            if (this.enter)
            {
                console.log('Enter')
            }

            if (this.shift)
            {
                console.log('Shift')
            }

            if (this.a)
            {
                console.log('A')
            }

            if (this.s)
            {
                console.log('S')
            }

            if (this.up)
            {
                console.log('Up')
            }

            if (this.down)
            {
                console.log('Down')
            }

            if (this.left)
            {
                console.log('Left')
            }

            if (this.right)
            {
                console.log('Right')
            }
        }
        */
    }

    this.cancel = function(event)
    {
        if (event.keyCode == 27)
        {
            this.escape = false
        }

        if (event.keyCode == 32)
        {
            this.space = false
        }

        if (event.keyCode == 13)
        {
            this.enter = false
        }

        if (event.keyCode == 16)
        {
            this.shift = false
        }

        if (event.keyCode == 65)
        {
            this.a = false
        }

        if (event.keyCode == 83)
        {
            this.s = false
        }

        if (event.keyCode == 38)
        {
            this.up = false
        }

        if (event.keyCode == 40)
        {
            this.down = false
        }

        if (event.keyCode == 37)
        {
            this.left = false
        }

        if (event.keyCode == 39)
        {
            this.right = false
        }
    }

    /*
    this.clear = function()
    {
        this.escape = false
        this.space = false
        this.enter = false
        this.shift = false
        this.a = false
        this.s = false
        this.up = false
        this.down = false
        this.left = false
        this.right = false
    }
    */
}