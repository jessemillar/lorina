var l = new Object()

var Lorina = function()
{
    l.dom = document.getElementById('canvas')
    l.ctx = document.getElementById('canvas').getContext('2d')

    var self = this

    this.setup = function(color, gamecenter, ads)
    {
        this.color = color

        if (gamecenter)
        {
            this.gamecenter = true
        }

        if (ads)
        {
            this.ads = true
        }

        return this
    }

    this.fullscreen = function()
    {
        if (window.navigator.vendor) // Check if we're using a non-Ejecta browser
        {
            window.onresize = function()
            {
                self.setFullscreen()
            }

            this.setFullscreen()
        }

        return this
    }

        this.setFullscreen = function()
        {
            document.body.style.background = l.color

            l.dom.style.position = 'absolute'
            l.dom.style.left = '0px'
            l.dom.style.top = '0px'
            l.dom.width = window.innerWidth
            l.dom.height = window.innerHeight

            return this
        }

    this.start = function(room)
    {
        this.room(room)

        return this
    }

    this.stop = function()
    {
        clearInterval(this.loop)

        return this
    }

    this.room = function(room)
    {
        if (this.loop)
        {
            clearInterval(this.loop)
        }

        this.loop = setInterval(room, 1000 / 60)

        return this
    }

    this.blank = function(color)
    {
        if (color)
        {
            l.ctx.fillStyle = color
        }
        else
        {
            l.ctx.fillStyle = l.color
        }

        l.ctx.fillRect(0, 0, l.dom.width, l.dom.height)

        return this
    }
}