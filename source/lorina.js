var l = new Object()

var Lorina = function()
{
    l.dom = document.getElementById('canvas')
    l.ctx = document.getElementById('canvas').getContext('2d')
    l.canvas = new Object()
    l.buffer = new Array()

    var self = this // Use for the screen resize listener

    // Put the sizing function above where we use it to set the default canvas size
    this.setSize = function(width, height)
    {
        l.canvas.width = width
        l.canvas.height = height
        
        return this
    }

        this.setDomSize = function(width, height)
        {
            l.dom.width = width
            l.dom.height = height

            return this
        }

    // Set the default canvas size
    if (window.navigator.vendor) // Check if we're using a non-Ejecta browser
    {
        this.setSize(256, 224) // I'm so clever for using the SNES's resolution as the default canvas size
            this.setDomSize(l.canvas.width, l.canvas.height)
    }
    else
    {
        this.setSize(l.dom.width, l.dom.height)
    }

    this.makeFullscreen = function()
    {
        if (window.navigator.vendor) // Check if we're using a non-Ejecta browser
        {
            document.body.style.background = this.color

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
            l.dom.style.position = 'absolute'
            l.dom.style.left = '0px'
            l.dom.style.top = '0px'
            l.dom.width = window.innerWidth
            l.dom.height = window.innerHeight
            l.canvas.width = l.dom.width
            l.canvas.height = l.dom.height

            return this
        }

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

    this.draw = function()
    {
        // Sort the buffer for z-indexing
        l.buffer.sort(function(a, b)
        {
            return a.anchor.y - b.anchor.y
        })

        for (var i = 0; i < l.buffer.length; i++)
        {
            l.ctx.drawImage(l.buffer[i].sprite.img, Math.round(l.buffer[i].x - l.camera.x), Math.round(l.buffer[i].y - l.camera.y))
        }

        l.buffer.length = 0 // Wipe the buffer for the next pass
    }
}