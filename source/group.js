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

    this.debug = function(color)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].debug(color)
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

    this.rotate = function(amount)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].rotate(amount)
        }

        return this
    }

    this.rotateTo = function(degree)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].rotateTo(degree)
        }

        return this
    }

    this.steer = function()
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].steer()
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

    this.flip = function(direction)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].flip(direction)
        }

        return this
    }

    this.hud = function()
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].hud()
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

    this.moveHorizontal = function(speed)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].moveHorizontal(speed)
        }

        return this
    }

    this.moveVertical = function(speed)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].moveVertical(speed)
        }

        return this
    }

    this.moveTo = function(x, y, speed)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].moveTo(x, y, speed)
        }

        return this
    }

    this.moveToward = function(entity, speed)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].moveToward(entity, speed)
        }

        return this
    }

    this.moveTowardDegree = function(degree, speed)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].moveTowardDegree(degree, speed)
        }

        return this
    }

    this.contain = function(xMin, xMax, yMin, yMax)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].contain(xMin, xMax, yMin, yMax)
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

    this.spin = function(force)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].spin(force)
        }

        return this
    }

    this.pushHorizontal = function(force)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].pushHorizontal(force)
        }

        return this
    }

    this.pushVertical = function(force)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].pushVertical(force)
        }

        return this
    }

    this.scatter = function(maxForce)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].scatter(maxForce)
        }

        return this
    }

    this.pullTo = function(x, y, force)
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].pullTo(x, y, force)
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

    this.applyPhysics = function() // Run to continuously update the friction of objects influenced by physics
    {
        var i = this.database.length
        while (i--)
        {
            this.database[i].applyPhysics()
        }

        return this
    }
}