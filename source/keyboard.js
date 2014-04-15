var Keyboard = function()
{
    var self = this

    window.onkeydown = function()
    {
        self.pressed(event)
    }

    window.onkeyup = function()
    {
        self.cancel(event)
    }

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

        if (event.keyCode == 87)
        {
            this.w = true
        }

        if (event.keyCode == 65)
        {
            this.a = true
        }

        if (event.keyCode == 83)
        {
            this.s = true
        }

        if (event.keyCode == 68)
        {
            this.d = true
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

        if (event.keyCode == 87)
        {
            this.w = false
        }

        if (event.keyCode == 65)
        {
            this.a = false
        }

        if (event.keyCode == 83)
        {
            this.s = false
        }

        if (event.keyCode == 68)
        {
            this.d = false
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
}