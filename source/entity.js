var Entity = function()
{
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.anchor = {x: 0, y: 0}
    this.bound = {x: 0, y: 0, width: 0, height: 0}
    this.sprite = {img: new Image()}

    this.debug = function(color)
    {
        if (!this.deleted)
        {
            if (color)
            {
                l.ctx.fillStyle = color
            }
            else
            {
                l.ctx.fillStyle = '#FF0000'
            }

            l.ctx.globalAlpha = 0.5

            l.ctx.fillRect(this.x + this.bound.x - l.camera.x, this.y + this.bound.y - l.camera.y, this.bound.width, this.bound.height)
            l.ctx.fillRect(this.x - 2 - l.camera.x, this.y - 2 - l.camera.y, 5, 5)

            l.ctx.globalAlpha = 1
        }

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

    this.setAnchor = function(x, y)
    {
        this.anchor = {x: x, y: y}

        if (this.width && this.height)
        {
            this.setBound(0 - this.anchor.x, 0 - this.anchor.y, this.width, this.height)
        }

        return this
    }

    this.setSize = function(width, height)
    {
        this.width = width
        this.height = height

        if (this.anchor.x && this.anchor.y)
        {
            this.setBound(0 - this.anchor.x, 0 - this.anchor.y, this.width, this.height)
        }

        return this
    }

    this.setBound = function(x, y, width, height)
    {
        this.bound = {x: x, y: y, width: width, height: height}

        return this
    }

    this.setSprite = function(location)
    {
        var self = this

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
        this.sprite.timer = Math.round(timer)

        var self = this

        this.animation = setInterval(function()
        {
            if (self.sprite.frame < self.sprite.count - 1)
            {
                self.sprite.frame += 1
            }
            else
            {
                self.sprite.frame = 0
            }
        }, self.sprite.timer)

        return this
    }

    this.pauseAnimation = function()
    {
        if (this.sprite.animation)
        {
            clearInterval(this.sprite.animation)
        }

        return this
    }

    this.buffer = function()
    {
        if (!this.deleted)
        {
            l.buffer.push(this)            
        }

        return this
    }

    this.flip = function(direction)
    {
        this.flipped = direction

        return this
    }

    this.draw = function()
    {
        if (!this.deleted)
        {
            if (this.flipped)
            {
                l.ctx.save()

                if (this.flipped == 'horizontal')
                {
                    l.ctx.translate(Math.round(this.x + this.width - (this.anchor.x * 2) - l.camera.x), Math.round(this.y - l.camera.y))
                    l.ctx.scale(-1, 1)
                }
                else if (this.flipped == 'vertical')
                {
                    l.ctx.translate(Math.round(this.x - l.camera.x), Math.round(this.y + this.height - (this.anchor.y * 2) - l.camera.y))
                    l.ctx.scale(1, -1)
                }
                else if (this.flipped == 'both')
                {
                    l.ctx.translate(Math.round(this.x + this.width - (this.anchor.x * 2) - l.camera.x), Math.round(this.y + this.height - (this.anchor.y * 2) - l.camera.y))
                    l.ctx.scale(-1, -1)
                }

                if (this.sprite.count)
                {
                    l.ctx.drawImage(this.sprite.img, this.sprite.frame * (this.sprite.width / this.sprite.count), 0, Math.round(this.sprite.width / this.sprite.count), this.sprite.height, Math.round(0 - this.anchor.x), Math.round(0 - this.anchor.y), Math.round(this.sprite.width / this.sprite.count), this.sprite.height)
                }
                else
                {
                    l.ctx.drawImage(this.sprite.img, Math.round(0 - this.anchor.x), Math.round(0 - this.anchor.y))
                }

                l.ctx.restore()
            }
            else
            {
                if (this.sprite.count)
                {
                    l.ctx.drawImage(this.sprite.img, this.sprite.frame * (this.sprite.width / this.sprite.count), 0, Math.round(this.sprite.width / this.sprite.count), this.sprite.height, Math.round(this.x - this.anchor.x - l.camera.x), Math.round(this.y - this.anchor.y - l.camera.y), Math.round(this.sprite.width / this.sprite.count), this.sprite.height)
                }
                else
                {
                    l.ctx.drawImage(this.sprite.img, Math.round(this.x - this.anchor.x - l.camera.x), Math.round(this.y - this.anchor.y - l.camera.y))
                }
            }
        }

        return this
    }

    this.snapTo = function(x, y)
    {
        this.x = x
        this.y = y

        return this
    }

    this.moveUp = function(speed)
    {
        this.y -= speed

        return this
    }

    this.moveDown = function(speed)
    {
        this.y += speed

        return this
    }

    this.moveLeft = function(speed)
    {
        this.x -= speed

        return this
    }

    this.moveRight = function(speed)
    {
        this.x += speed

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
        var horizontal = Math.abs(this.x - entity.x)
        var vertical = Math.abs(this.y - entity.y)
        var total = Math.sqrt(Math.abs(this.x - entity.x) * Math.abs(this.x - entity.x) + Math.abs(this.y - entity.y) * Math.abs(this.y - entity.y))

        var xSpeed = horizontal / total * force
        var ySpeed = vertical / total * force

        if (total > 1)
        {
            if (this.x < entity.x && this.y < entity.y)
            {
                this.pushRight(xSpeed)
                this.pushDown(ySpeed)
            }
            else if (this.x > entity.x && this.y < entity.y)
            {
                this.pushLeft(xSpeed)
                this.pushDown(ySpeed)
            }
            else if (this.x < entity.x && this.y > entity.y)
            {
                this.pushRight(xSpeed)
                this.pushUp(ySpeed)
            }
            else if (this.x > entity.x && this.y > entity.y)
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

        if (this.x + this.bound.x <= xMin)
        {
            this.x = xMin - this.bound.x
            this.momentum.x = -this.momentum.x
        }
        else if (this.x + this.bound.x + this.bound.width >= xMax)
        {
            this.x = xMax - this.bound.width - this.bound.x
            this.momentum.x = -this.momentum.x
        }

        if (this.y + this.bound.y <= yMin)
        {
            this.y = yMin - this.bound.y
            this.momentum.y = -this.momentum.y
        }
        else if (this.y + this.bound.y + this.bound.height >= yMax)
        {
            this.y = yMax - this.bound.height - this.bound.y
            this.momentum.y = -this.momentum.y
        }

        return this
    }

    this.updatePhysics = function() // Run to continuously update the friction of objects influenced by physics
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

        return this
    }
}