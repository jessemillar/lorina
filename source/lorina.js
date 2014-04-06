// set
// make
// enable

var l = new Object()

var Lorina = function()
{
    l.dom = document.getElementById('canvas')
    l.ctx = document.getElementById('canvas').getContext('2d')
    l.canvas = {width: 256, height: 224} // I'm so clever for using the SNES resolution as the default canvas size
        l.dom.width = l.canvas.width
        l.dom.height = l.canvas.height

    var self = this

    this.enableGamecenter = function()
    {
        this.gamecenter = true

        return this
    }

    this.enableAds = function()
    {
        this.ads = true

        return this
    }

    this.setSize = function(width, height)
    {
        l.canvas.width = width
        l.canvas.height = height
        l.dom.width = width
        l.dom.height = height

        return this
    }

    this.makeFullscreen = function()
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
            if (l.canvas.width)
            l.dom.width = window.innerWidth
            l.dom.height = window.innerHeight
            l.canvas.width = l.dom.width
            l.canvas.height = l.dom.height

            return this
        }

    this.start = function(room)
    {
        this.setRoom(room)

        return this
    }

    this.stop = function()
    {
        clearInterval(this.loop)

        return this
    }

    this.setRoom = function(room)
    {
        if (this.loop)
        {
            clearInterval(this.loop)
        }

        this.loop = setInterval(room, 1000 / 60)

        return this
    }

    this.setColor = function(color)
    {
        this.color = color

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
            l.ctx.fillStyle = this.color
        }

        l.ctx.fillRect(0, 0, l.dom.width, l.dom.height)

        return this
    }
}