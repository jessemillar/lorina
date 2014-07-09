var Entity = function()
{
    this.x = 0
    this.y = 0
    this.difference = {x: 0, y: 0}
    this.width = 0
    this.height = 0
    this.degree = 0
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

        this.recordDifference = function(orientation, value)
        {
            if (orientation == 'horizontal')
            {
                this.difference.x = value
            }
            else if (orientation == 'vertical')
            {
                this.difference.y = value
            }

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

    this.setStretch = function(width, height)
    {
        this.stretch = {width: width, height: height}

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
        this.fixRotation()

        return this
    }

    this.rotateTo = function(degree)
    {
        this.degree = degree
        this.fixRotation()

        return this
    }

        this.fixRotation = function()
        {
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

    this.steer = function()
    {
        this.degree = -Math.atan(this.difference.y / this.difference.x) * 180 / Math.PI

        if (this.difference.x < 0)
        {
            this.degree += 180
        }

        return this
    }

    this.setSprite = function(location)
    {
        var self = this

        this.sprite.img.onload = function()
        {
            self.sprite.width = this.width
            self.sprite.height = this.height
        }

        this.sprite.img.src = location

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

    this.setOpacity = function(opacity)
    {
        this.opacity = opacity

        return this
    }

    this.fadeOut = function(increment)
    {
        if (this.opacity > 0)
        {
            this.opacity -= increment
        }
        else
        {
            this.opacity = 0
        }

        return this
    }

    this.fadeIn = function(increment)
    {
        if (this.opacity < 1)
        {
            this.opacity += increment
        }
        else
        {
            this.opacity = 1
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

        this.unflip = function(direction)
        {
            if (this.flipped == 'horizontal')
            {
                if (this.flipped == 'both')
                {
                    this.flipped = 'vertical'
                }
                else
                {
                    delete this.flipped
                }
            }
            else if (this.flipped == 'vertical')
            {
                if (this.flipped == 'both')
                {
                    this.flipped = 'vertical'
                }
                else
                {
                    delete this.flipped
                }
            }
            else if (this.flipped == 'both')
            {
                delete this.flipped
            }

            return this
        }

    this.hud = function()
    {
        this.drawMode = 'hud'

        return this
    }

    this.draw = function()
    {
        if (this.drawMode == 'hud')
        {
            this.cameraX = 0
            this.cameraY = 0
        }
        else
        {
            this.cameraX = l.camera.x
            this.cameraY = l.camera.y
        }

        if (!this.deleted)
        {
            if (this.opacity)
            {
                l.ctx.globalAlpha = this.opacity
            }

            if (this.flipped || this.degree)
            {
                l.ctx.save()

                if (this.flipped !== 'undefined')
                {
                    if (this.flipped == 'horizontal')
                    {
                        l.ctx.translate(Math.round(this.x + this.width - (this.anchor.x * 2) - this.cameraX), Math.round(this.y - this.cameraY))
                        l.ctx.scale(-1, 1)
                    }
                    else if (this.flipped == 'vertical')
                    {
                        l.ctx.translate(Math.round(this.x - this.cameraX), Math.round(this.y + this.height - (this.anchor.y * 2) - this.cameraY))
                        l.ctx.scale(1, -1)
                    }
                    else if (this.flipped == 'both')
                    {
                        l.ctx.translate(Math.round(this.x + this.width - (this.anchor.x * 2) - this.cameraX), Math.round(this.y + this.height - (this.anchor.y * 2) - this.cameraY))
                        l.ctx.scale(-1, -1)
                    }
                }

                if (this.degree)
                {
                    l.ctx.translate(Math.round(this.x - this.cameraX), Math.round(this.y - this.cameraY))
                    l.ctx.rotate(this.degree * Math.PI / 180 * -1)
                }

                if (this.stretch)
                {
                    if (this.sprite.count)
                    {
                        l.ctx.drawImage(this.sprite.img, this.sprite.frame * (this.sprite.width / this.sprite.count), 0, this.sprite.width / this.sprite.count, this.sprite.height, Math.round(0 - this.anchor.x), Math.round(0 - this.anchor.y), this.sprite.width / this.sprite.count, this.sprite.height, this.stretch.width, this.stretch.height)
                    }
                    else
                    {
                        l.ctx.drawImage(this.sprite.img, Math.round(0 - this.anchor.x), Math.round(0 - this.anchor.y), this.stretch.width, this.stretch.height)
                    }
                }
                else
                {
                    if (this.sprite.count)
                    {
                        l.ctx.drawImage(this.sprite.img, this.sprite.frame * (this.sprite.width / this.sprite.count), 0, this.sprite.width / this.sprite.count, this.sprite.height, Math.round(0 - this.anchor.x), Math.round(0 - this.anchor.y), this.sprite.width / this.sprite.count, this.sprite.height)
                    }
                    else
                    {
                        l.ctx.drawImage(this.sprite.img, Math.round(0 - this.anchor.x), Math.round(0 - this.anchor.y))
                    }
                }

                l.ctx.restore()
            }
            else
            {
                if (this.stretch)
                {
                    if (this.sprite.count)
                    {
                        l.ctx.drawImage(this.sprite.img, this.sprite.frame * (this.sprite.width / this.sprite.count), 0, this.sprite.width / this.sprite.count, this.sprite.height, Math.round(this.x - this.anchor.x - this.cameraX), Math.round(this.y - this.anchor.y - this.cameraY), this.sprite.width / this.sprite.count, this.sprite.height, this.stretch.width, this.stretch.height)
                    }
                    else
                    {
                        l.ctx.drawImage(this.sprite.img, Math.round(this.x - this.anchor.x - this.cameraX), Math.round(this.y - this.anchor.y - this.cameraY), this.stretch.width, this.stretch.height)
                    }
                }
                else
                {
                    if (this.sprite.count)
                    {
                        l.ctx.drawImage(this.sprite.img, this.sprite.frame * (this.sprite.width / this.sprite.count), 0, this.sprite.width / this.sprite.count, this.sprite.height, Math.round(this.x - this.anchor.x - this.cameraX), Math.round(this.y - this.anchor.y - this.cameraY), this.sprite.width / this.sprite.count, this.sprite.height)
                    }
                    else
                    {
                        l.ctx.drawImage(this.sprite.img, Math.round(this.x - this.anchor.x - this.cameraX), Math.round(this.y - this.anchor.y - this.cameraY))
                    }
                }
            }
        }

        if (this.opacity)
        {
            l.ctx.globalAlpha = 1 // Reset the global opacity before returning
        }

        return this
    }

    this.snapTo = function(x, y)
    {
        this.x = x
        this.y = y

        return this
    }

    this.moveHorizontal = function(speed)
    {
        this.recordDifference('horizontal', speed)

        this.x += speed

        return this
    }

    this.moveVertical = function(speed)
    {
        this.recordDifference('vertical', speed)

        this.y += speed

        return this
    }

    this.moveTo = function(x, y, speed)
    {
        var horizontal = x - this.x
        var vertical = y - this.y
        var total = Math.sqrt(horizontal * horizontal + vertical * vertical)

        var xSpeed = horizontal / total * speed
        var ySpeed = vertical / total * speed

        if (total > 1)
        {
            this.moveHorizontal(xSpeed)
            this.moveVertical(ySpeed)
        }

        return this
    }

    this.moveToward = function(entity, speed)
    {
        if (!entity.deleted)
        {
            var horizontal = entity.x - this.x
            var vertical = entity.y - this.y
            var total = Math.sqrt(horizontal * horizontal + vertical * vertical)

            var xSpeed = horizontal / total * speed
            var ySpeed = vertical / total * speed

            if (total > 1)
            {
                this.moveHorizontal(xSpeed)
                this.moveVertical(ySpeed)
            }
        }

        return this
    }

    this.moveTowardDegree = function(degree, speed)
    {
        this.moveHorizontal(Math.cos(degree * Math.PI / 180) * speed)
        this.moveVertical(-Math.sin(degree * Math.PI / 180) * speed)

        return this
    }

    this.contain = function(xMin, xMax, yMin, yMax)
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
        }
        else if (this.x + this.bound.x + this.bound.width >= xMax)
        {
            this.x = xMax - this.bound.width - this.bound.x
        }

        if (this.y + this.bound.y <= yMin)
        {
            this.y = yMin - this.bound.y
        }
        else if (this.y + this.bound.y + this.bound.height >= yMax)
        {
            this.y = yMax - this.bound.height - this.bound.y
        }

        return this
    }

    this.setFriction = function(movement, rotation)
    {
        if (rotation)
        {
            this.friction = {x: 0, y: 0, movement: movement, rotation: rotation}            
        }
        else
        {
            this.friction = {x: 0, y: 0, movement: movement, rotation: movement} 
        }

        this.momentum = {x: 0, y: 0, rotation: 0}

        return this
    }

    this.freeze = function()
    {
        this.momentum = {x: 0, y: 0, rotation: 0}

        return this
    }

    this.spin = function(force)
    {
        this.momentum.rotation = force

        return this
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

    this.pullTo = function(x, y, force)
    {
        var horizontal = x - this.x
        var vertical = y - this.y
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

    this.pullToward = function(entity, force)
    {
        if (!entity.deleted)
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

    this.applyPhysics = function() // Run to continuously update the friction of objects influenced by physics
    {        
        if (this.momentum.x && this.momentum.y)
        {
            if (Math.abs(this.momentum.x) > Math.abs(this.momentum.y))
            {
                this.friction.x = this.friction.movement
                this.friction.y = Math.abs(this.momentum.y / this.momentum.x * this.friction.movement)
            }
            else
            {
                this.friction.x = Math.abs(this.momentum.x / this.momentum.y * this.friction.movement)
                this.friction.y = this.friction.movement
            }
        }

        if (this.momentum.x !== 0) // Horizontal motion
        {
            this.moveHorizontal(this.momentum.x)

            if (this.momentum.x < 0) // Moving left
            {
                this.momentum.x += this.friction.x

                if (this.momentum.x > 0)
                {
                    this.momentum.x = 0
                }
            }
            else if (this.momentum.x > 0) // Moving right
            {
                this.momentum.x -= this.friction.x

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
                this.momentum.y += this.friction.y

                if (this.momentum.y > 0)
                {
                    this.momentum.y = 0
                }
            }
            else if (this.momentum.y > 0) // Moving down
            {
                this.momentum.y -= this.friction.y

                if (this.momentum.y < 0)
                {
                    this.momentum.y = 0
                }
            }
        }

        if (this.momentum.rotation !== 0)
        {
            this.degree += this.momentum.rotation

            if (this.momentum.rotation < 0)
            {
                this.momentum.rotation += this.friction.rotation

                if (this.momentum.rotation > 0)
                {
                    this.momentum.rotation = 0
                }
            }
            else if (this.momentum.rotation > 0)
            {
                this.momentum.rotation -= this.friction.rotation

                if (this.momentum.rotation < 0)
                {
                    this.momentum.rotation = 0
                }
            }
        }

        return this
    }
}