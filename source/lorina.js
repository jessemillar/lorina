var l = new Object()

var Lorina = function()
{
    l.dom = document.getElementById('canvas')
    l.ctx = document.getElementById('canvas').getContext('2d')
    l.room = new Object()
    l.buffer = new Array()
    l.camera = {state: 'resting', x: 0, y: 0, previous: {x: 0, y: 0}, sandbox: {width: 1, height: 1}}
    l.loaded = false
    l.preloader = {total: 0, current: 0, percent: 0}

    l.preloader.add = function()
    {
        l.preloader.total++
        l.preloader.current++
    }

    l.preloader.subtract = function()
    {
        l.preloader.current--
        l.preloader.percent = Math.round(l.preloader.current / l.preloader.total)

        if (l.preloader.current == 0)
        {
            l.loaded = true
        }
    }

    // Put the sizing function above where we use it to set the default canvas size
    this.setRoomSize = function(width, height)
    {
        l.room.width = width
        l.room.height = height
        
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
        this.setRoomSize(256, 224) // I'm so clever for using the SNES's resolution as the default canvas size
            this.setDomSize(l.room.width, l.room.height)
    }
    else
    {
        this.setRoomSize(l.dom.width, l.dom.height)
    }

    this.makeRoomFullscreen = function()
    {
        this.stretch = true

        return this
    }

    this.makeFullscreen = function()
    {
        if (window.navigator.vendor) // Check if we're using a non-Ejecta browser
        {            
            document.body.style.background = this.color

            var self = this

            window.onresize = function()
            {
                self.setFullscreen()
            }

            this.setFullscreen()

            l.room.width = l.dom.width
            l.room.height = l.dom.height
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

            if (this.stretch)
            {
                l.room.width = l.dom.width
                l.room.height = l.dom.height
            }

            return this
        }

    /*
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
    */

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

        l.buffer.length = 0 // Wipe the buffer for the next pass

        return this
    }

    this.draw = function()
    {
        l.buffer.sort(function(a, b)
        {
            return a.y - b.y
        })

        var i = l.buffer.length

        while (i--)
        {
            l.buffer[i].draw()
        }

        return this
    }

    this.checkCollision = function(a, b)
    {
        if (!a.deleted)
        {
            if (b.database.length)
            {
                var i = b.database.length

                while (i--)
                {
                    if (!b.database[i].deleted)
                    {
                        if (a.x + a.bound.x < b.database[i].x + b.database[i].bound.x + b.database[i].bound.width && a.x + a.bound.x + a.bound.width > b.database[i].x + b.database[i].bound.x && a.y + a.bound.y < b.database[i].y + b.database[i].bound.y + b.database[i].bound.height && a.y + a.bound.y + a.bound.height > b.database[i].y + b.database[i].bound.y)
                        {
                            return b.database[i]
                        }
                    }
                }

                return false
            }
            else
            {
                if (a.x + a.bound.x < b.x + b.bound.x + b.bound.width && a.x + a.bound.x + a.bound.width > b.x + b.bound.x && a.y + a.bound.y < b.y + b.bound.y + b.bound.height && a.y + a.bound.y + a.bound.height > b.y + b.bound.y)
                {
                    return b
                }
                else
                {
                    return false
                }
            }
        }
        else
        {
            return false
        }
    }
}