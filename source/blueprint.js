var Blueprint = function()
{
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.anchor = {offset: {x: 0, y: 0}}
    this.bound = {offset: {x: 0, y: 0}, width: 0, height: 0}
    this.sprite = {img: new Image()}

    this.setPosition = function(x, y)
    {
        this.x = x
        this.y = y

        return this
    }

    this.setSize = function(width, height)
    {
        this.width = width
        this.height = height

        return this
    }

    this.setAnchor = function(x, y)
    {
        this.anchor = {x: x, y: y}

        return this
    }

    this.setBound = function(x, y, width, height)
    {
        this.bound = {x: x, y: y, width: width, height: height}

        return this
    }

    // Throw the preloader counting in here
    this.setSprite = function(location)
    {
        var self = this // We can't normally access "this" from inside the eventListener, so we have to hack it to work

        this.sprite.img.addEventListener('load', function()
        {
            self.sprite.width = this.width
            self.sprite.height = this.height

            l.preloader.current--
            l.preloader.percent = Math.round(l.preloader.current / l.preloader.total)

            if (l.preloader.current == 0)
            {
                l.loaded = true
            }
        })

        this.sprite.img.src = location

        l.preloader.total++
        l.preloader.current++

        return this
    }

    this.setAnimation = function(count, timer)
    {
        this.sprite.frame = 0
        this.sprite.count = count
        this.sprite.timer = timer

        return this
    }

    this.setFriction = function(friction)
    {
        this.friction = friction
        this.momentum = {x: 0, y: 0}

        return this
    }
}