var Entity = function()
{
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.anchor = {offset: {x: 0, y: 0}}
    this.bound = {offset: {x: 0, y: 0}, width: 0, height: 0}
    this.sprite = {img: new Image()}

    this.copy = function(entity)
    {
        this.x = entity.x
        this.y = entity.y
        this.width = entity.width
        this.height = entity.height
        this.anchor = entity.anchor
        this.bound = entity.bound
        this.sprite = entity.sprite

        return this
    }

    this.delete = function()
    {
        this.deleted = true

        return this
    }

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
        this.setBound(0, 0, this.width, this.height)

        return this
    }

    this.setAnchor = function(x, y)
    {
        this.anchor = {offset: {x: x, y: y}}

        this.reposition()

        this.update()

        return this
    }

        this.reposition = function()
        {
            this.x -= this.anchor.offset.x
            this.y -= this.anchor.offset.y
        }

    this.setBound = function(x, y, width, height)
    {
        this.bound = {offset: {x: x, y: y}, width: width, height: height}

        this.update()

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
        this.sprite.animation = this.animate(this)

        return this
    }

        // Use an external function to circumvent variable scope problems
        this.animate = function(entity)
        {
            setInterval(function()
            {
                if (entity.sprite.frame < entity.sprite.count - 1)
                {
                    entity.sprite.frame += 1
                }
                else
                {
                    entity.sprite.frame = 0
                }
            }, entity.sprite.timer)
        }

    this.pauseAnimation = function()
    {
        if (this.sprite.animation)
        {
            clearInterval(this.sprite.animation)
        }
    }

    this.buffer = function()
    {
        if (!this.deleted)
        {
            l.buffer.push(this)            
        }
    }

    this.draw = function()
    {
        if (!this.deleted)
        {
            l.ctx.drawImage(this.sprite.img, Math.round(this.x), Math.round(this.y))
        }
    }

    this.snapTo = function(x, y)
    {
        this.x = x
        this.y = y

        this.reposition()

        this.update()

        return this
    }

    this.moveUp = function(speed)
    {
        this.y -= speed

        this.update()

        return this
    }

    this.moveDown = function(speed)
    {
        this.y += speed

        this.update()

        return this
    }

    this.moveLeft = function(speed)
    {
        this.x -= speed

        this.update()

        return this
    }

    this.moveRight = function(speed)
    {
        this.x += speed

        this.update()

        return this
    }

    this.setFriction = function(friction)
    {
        this.friction = friction
        this.momentum = {x: 0, y: 0}

        return this
    }

    this.freeze = function()
    {
        this.momentum.x = 0
        this.momentum.y = 0
    }

    this.pushUp = function(force)
    {
        this.momentum.y -= force

        return this
    }

    this.pushDown = function(force)
    {
        this.momentum.y += force

        return this
    }

    this.pushLeft = function(force)
    {
        this.momentum.x -= force

        return this
    }

    this.pushRight = function(force)
    {
        this.momentum.x += force

        return this
    }

    this.pullToward = function(entity, force)
    {
        var horizontal = Math.abs(this.anchor.x - entity.anchor.x)
        var vertical = Math.abs(this.anchor.y - entity.anchor.y)
        var total = Math.sqrt(Math.abs(this.anchor.x - entity.anchor.x) * Math.abs(this.anchor.x - entity.anchor.x) + Math.abs(this.anchor.y - entity.anchor.y) * Math.abs(this.anchor.y - entity.anchor.y))

        var xSpeed = horizontal / total * force
        var ySpeed = vertical / total * force

        console.log(xSpeed)

        if (total > 1)
        {
            if (this.anchor.x < entity.anchor.x && this.anchor.y < entity.anchor.y)
            {
                this.pushRight(xSpeed)
                this.pushDown(ySpeed)
            }
            else if (this.anchor.x > entity.anchor.x && this.anchor.y < entity.anchor.y)
            {
                this.pushLeft(xSpeed)
                this.pushDown(ySpeed)
            }
            else if (this.anchor.x < entity.anchor.x && this.anchor.y > entity.anchor.y)
            {
                this.pushRight(xSpeed)
                this.pushUp(ySpeed)
            }
            else if (this.anchor.x > entity.anchor.x && this.anchor.y > entity.anchor.y)
            {
                this.pushLeft(xSpeed)
                this.pushUp(ySpeed)
            }
        }

        return this
    }

    this.bounce = function(xMin, xMax, yMin, yMax)
    {
        if (!xMin && !xMax && !yMin && !yMax)
        {
            xMin = 0
            xMax = l.canvas.width
            yMin = 0
            yMax = l.canvas.height
        }

        if (!this.bound)
        {
            this.setBound(0, 0, this.width, this.height)
        }

        if (this.x + this.bound.offset.x <= xMin)
        {
            this.x = xMin - this.bound.offset.x
            this.momentum.x = -this.momentum.x
        }
        else if (this.x + this.bound.offset.x + this.bound.width >= xMax)
        {
            this.x = xMax - this.bound.width - (this.width - this.bound.offset.x - this.bound.width)
            this.momentum.x = -this.momentum.x
        }

        if (this.y + this.bound.offset.y <= yMin)
        {
            this.y = yMin - this.bound.offset.y
            this.momentum.y = -this.momentum.y
        }
        else if (this.y + this.bound.offset.y + this.bound.height >= yMax)
        {
            this.y = yMax - this.bound.height - (this.height - this.bound.offset.y - this.bound.height)
            this.momentum.y = -this.momentum.y
        }

        return this
    }

    this.physics = function() // Run to continuously update the friction of objects influenced by physics
    {
        if (this.momentum.x !== 0) // Horizontal motion
        {
            if (this.momentum.x < 0) // Moving left
            {
                this.moveLeft(Math.abs(this.momentum.x))
                this.momentum.x += this.friction

                if (this.momentum.x > 0)
                {
                    this.momentum.x = 0
                }
            }
            else if (this.momentum.x > 0) // Moving right
            {
                this.moveRight(Math.abs(this.momentum.x))
                this.momentum.x -= this.friction

                if (this.momentum.x < 0)
                {
                    this.momentum.x = 0
                }
            }
        }

        if (this.momentum.y !== 0) // Vertical motion
        {
            if (this.momentum.y < 0) // Moving up
            {
                this.moveUp(Math.abs(this.momentum.y))
                this.momentum.y += this.friction

                if (this.momentum.y > 0)
                {
                    this.momentum.y = 0
                }
            }
            else if (this.momentum.y > 0) // Moving down
            {
                this.moveDown(Math.abs(this.momentum.y))
                this.momentum.y -= this.friction

                if (this.momentum.y < 0)
                {
                    this.momentum.y = 0
                }
            }
        }

        this.update()

        return this
    }

        // Must manually run when "this.x" or "this.y" change
        this.update = function()
        {
            this.anchor.x = this.x + this.anchor.offset.x
            this.anchor.y = this.y + this.anchor.offset.y

            this.bound.x = this.x + this.bound.offset.x
            this.bound.y = this.y + this.bound.offset.y

            // Don't "return this" here, do it in the functions that call "this.update" instead
        }
}