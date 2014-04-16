var Entity = function()
{
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.anchor = {x: 0, y: 0}
    this.degree = 0
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

    this.rotate = function(amount)
    {
        this.degree += amount

        if (this.degree < 0)
        {
            this.degree += 360
        }
        else if (this.degree > 360)
        {
            this.degree -= 360
        }

        return this
    }

    this.rotateTo = function(degree)
    {
        this.degree = degree

        return this
    }

    this.setSprite = function(location)
    {
        var self = this

        this.sprite.img.onload = function()
        {
            self.sprite.width = this.width
            self.sprite.height = this.height

            l.preloader.subtract()

            if (l.preloader.current == 0)
            {
                l.loaded = true
            }
        }

        this.sprite.img.src = location

        l.preloader.add()

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
            if (this.flipped || this.degree)
            {
                l.ctx.save()

                if (this.flipped)
                {
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
                }

                if (this.degree)
                {
                    l.ctx.translate(Math.round(this.x - l.camera.x), Math.round(this.y - l.camera.x))
                    l.ctx.rotate(this.degree * Math.PI / 180 * -1)
                }

                if (this.sprite.count)
                {
                    l.ctx.drawImage(this.sprite.img, this.sprite.frame * (this.sprite.width / this.sprite.count), 0, this.sprite.width / this.sprite.count, this.sprite.height, Math.round(0 - this.anchor.x), Math.round(0 - this.anchor.y), this.sprite.width / this.sprite.count, this.sprite.height)
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
                    l.ctx.drawImage(this.sprite.img, this.sprite.frame * (this.sprite.width / this.sprite.count), 0, this.sprite.width / this.sprite.count, this.sprite.height, Math.round(this.x - this.anchor.x - l.camera.x), Math.round(this.y - this.anchor.y - l.camera.y), this.sprite.width / this.sprite.count, this.sprite.height)
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

    this.moveTowardDegree = function(degree, speed)
    {
        this.x += Math.cos(degree * Math.PI / 180) * speed
        this.y += -Math.sin(degree * Math.PI / 180) * speed

        return this
    }

    this.moveHorizontal = function(speed)
    {
        this.x += speed

        return this
    }

    this.moveVertical = function(speed)
    {
        this.y += speed

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

    this.pushTowardDegree = function(degree, force)
    {
        this.momentum.x = Math.cos(degree * Math.PI / 180) * force
        this.momentum.y = -Math.sin(degree * Math.PI / 180) * force

        return this
    }

    this.pushHorizontal = function(force)
    {
        this.momentum.x += force

        return this
    }

    this.pushVertical = function(force)
    {
        this.momentum.y += force

        return this
    }

    this.scatter = function(maxForce)
    {
        this.momentum.x = Math.random() * (maxForce - (maxForce * -1)) + (maxForce * -1)
        this.momentum.y = Math.random() * (maxForce - (maxForce * -1)) + (maxForce * -1)

        return this
    }

    this.pullToward = function(entity, force)
    {
        var horizontal = entity.x - this.x
        var vertical = entity.y - this.y
        var total = Math.sqrt(horizontal * horizontal + vertical * vertical)

        var xSpeed = horizontal / total * force
        var ySpeed = vertical / total * force

        if (total > 1)
        {
            this.pushHorizontal(xSpeed)
            this.pushVertical(ySpeed)
        }

        return this
    }

    this.bounce = function(xMin, xMax, yMin, yMax)
    {
        if (!xMin && !xMax && !yMin && !yMax)
        {
            xMin = 0
            xMax = l.room.width
            yMin = 0
            yMax = l.room.height
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
            this.moveHorizontal(this.momentum.x)

            if (this.momentum.x < 0) // Moving left
            {
                this.momentum.x += this.friction

                if (this.momentum.x > 0)
                {
                    this.momentum.x = 0
                }
            }
            else if (this.momentum.x > 0) // Moving right
            {
                this.momentum.x -= this.friction

                if (this.momentum.x < 0)
                {
                    this.momentum.x = 0
                }
            }
        }

        if (this.momentum.y !== 0) // Vertical motion
        {
            this.moveVertical(this.momentum.y)

            if (this.momentum.y < 0) // Moving up
            {
                this.momentum.y += this.friction

                if (this.momentum.y > 0)
                {
                    this.momentum.y = 0
                }
            }
            else if (this.momentum.y > 0) // Moving down
            {
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