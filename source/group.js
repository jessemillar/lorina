var Group = function()
{
    this.database = new Array()

    this.add = function(entity)
    {
        this.database.push(entity)
    }

    this.remove = function(entity)
    {
        var i = this.database.length

        while (i--)
        {
            if (this.database[i] == entity)
            {
                this.database.splice(i, 1)
                break
            }
        }
    }

    this.copy = function(entity)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].copy(entity)
        }

        return this
    }

    this.delete = function()
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].delete()
        }

        return this
    }

    this.setPosition = function(x, y)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].setPosition(x, y)
        }

        return this
    }

    this.setSize = function(width, height)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].setSize(width, height)
        }

        return this
    }

    this.setAnchor = function(x, y)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].setAnchor(x, y)
        }

        return this
    }

    this.setBound = function(x, y, width, height)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].setbound(x, y, width, height)
        }

        return this
    }

    // Throw the preloader counting in here
    this.setSprite = function(location)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].setSprite(location)
        }

        return this
    }

    this.setAnimation = function(count, timer)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].setAnimation(count, timer)
        }

        return this
    }

    this.pauseAnimation = function()
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].pauseAnimation()
        }

        return this
    }

    this.buffer = function()
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].buffer()
        }

        return this
    }

    this.draw = function()
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].draw()
        }

        return this
    }

    this.snapTo = function(x, y)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].snapTo(x, y)
        }

        return this
    }

    this.moveUp = function(speed)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].moveUp(speed)
        }

        return this
    }

    this.moveDown = function(speed)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].moveDown(speed)
        }

        return this
    }

    this.moveLeft = function(speed)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].moveLeft(speed)
        }

        return this
    }

    this.moveRight = function(speed)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].moveRight(speed)
        }

        return this
    }

    this.setFriction = function(friction)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].setFriction(friction)
        }

        return this
    }

    this.freeze = function()
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].freeze()
        }

        return this
    }

    this.pushUp = function(force)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].pushUp(force)
        }

        return this
    }

    this.pushDown = function(force)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].pushDown(force)
        }

        return this
    }

    this.pushLeft = function(force)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].pushLeft(force)
        }

        return this
    }

    this.pushRight = function(force)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].pushRight(force)
        }

        return this
    }

    this.pullToward = function(entity, force)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].pullToward(entity, force)
        }

        return this
    }

    this.bounce = function(xMin, xMax, yMin, yMax)
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].bounce(xMin, xMax, yMin, yMax)
        }

        return this
    }

    this.physics = function() // Run to continuously update the friction of objects influenced by physics
    {
        var i = this.database.length

        while (i--)
        {
            this.database[i].physics()
        }

        return this
    }
}