var Blueprint = function()
{
    this.sprite = {img: new Image()}

    this.setSize = function(width, height)
    {
        this.width = width
        this.height = height

        return this
    }

    this.setGroup = function(group)
    {
        this.group = group

        return this
    }

    this.setAnchor = function(x, y)
    {
        this.anchor = {offset: {x: x, y: y}}

        return this
    }

    this.setBound = function(x, y, width, height)
    {
        this.bound = {offset: {x: x, y: y}, width: width, height: height}

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
        })

        this.sprite.img.src = location

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