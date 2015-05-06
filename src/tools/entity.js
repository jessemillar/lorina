l.entity = function() {
    this.rotation = 0; // Need to instantiate here for the rotate() function to be able to work
    this.stuck = false; // We're not stuck to a wall

    // Engine values (you'll be better off if you only use engine functions to mess with these)
    this.sprite = {
        img: new Image()
    };
    this.previous = {
        x: 0,
        y: 0
    };
    this.anchor = {
        x: 0,
        y: 0
    };
    this.bound = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    this.friction = {
        x: 0,
        y: 0,
        movement: 0,
        rotation: 0
    };
    this.momentum = {
        x: 0,
        y: 0,
        rotation: 0
    };

    this.debug = function(color) { // Show visual bounding boxes
        if (!this.deleted) {
            if (color) {
                l.globals.ctx.fillStyle = color;
            } else {
                l.globals.ctx.fillStyle = '#FF0000';
            }

            l.globals.ctx.globalAlpha = 0.5;

            l.globals.ctx.fillRect(this.x + this.bound.x - l.globals.camera.x, this.y + this.bound.y - l.globals.camera.y, this.bound.width, this.bound.height);
            l.globals.ctx.fillRect(this.x - 2 - l.globals.camera.x, this.y - 2 - l.globals.camera.y, 5, 5);

            l.globals.ctx.globalAlpha = 1;
        }

        return this;
    };

    this.delete = function() { // Doesn't actually delete, but sets a trigger that disables displaying objects and running calculations
        if (!this.deleted) {
            this.deleted = true; // Super ghetto
            this.freeze();
        }

        return this;
    };

    this.banish = function(padding) { // Delete if we're outside of the screen by a defined amount
        if (!this.deleted) {
            if (!padding) {
                padding = 300; // Super ghetto again...
            }

            if (this.x < -padding || this.x > l.globals.room.width + padding || this.y < -padding || this.y > l.globals.room.height + padding) {
                this.delete();
            }
        }

        return this;
    };

    this.setTrait = function(name, value) { // Sets a non-engine value (such as health or ammo)
        this[name] = value;

        return this;
    };

    this.deleteTrait = function(name) { // Deletes a non-engine value
        delete this[name];

        return this;
    };

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;

        return this;
    };

    this.recordDifference = function(orientation, value) {
        if (orientation == 'horizontal') {
            this.previous.x = value;
        } else if (orientation == 'vertical') {
            this.previous.y = value;
        }

        return this;
    };

    this.setAnchor = function(x, y) {
        this.anchor = {
            x: x,
            y: y
        };

        if (this.width && this.height) {
            this.setBound(0 - this.anchor.x, 0 - this.anchor.y, this.width, this.height);
        }

        return this;
    };

    this.setSize = function(width, height, applyBound) {
        this.width = width;
        this.height = height;

        if (applyBound) {
            this.setBound(this.x, this.y, this.width, this.height);
        }

        return this;
    };

    this.setBound = function(x, y, width, height) {
        this.bound = {
            x: x,
            y: y,
            width: width,
            height: height
        };

        return this;
    };

    this.rotate = function(amount) {
        this.rotation += amount;
        this.fixRotation();

        return this;
    };

    this.rotateTo = function(degree) {
        this.rotation = degree;
        this.fixRotation();

        return this;
    };

    this.fixRotation = function() { // Compensate for when we have rotational values less than 0 degrees or greater than 360 degrees
        if (this.rotation < 0) {
            this.rotation += 360;
        } else if (this.rotation > 360) {
            this.rotation -= 360;
        }

        return this;
    };

    this.steer = function() { // Rotate to face in the direction the entity is traveling in
        this.rotation = -Math.atan(this.previous.y / this.previous.x) * 180 / Math.PI;

        if (this.previous.x < 0) {
            this.rotation += 180;
        }

        return this;
    };

    this.setSprite = function(fileLocation, applySize, applyBound, frameCount, timeBetweenFrames) {
        var self = this;

        this.sprite.img.onload = function() { // Do the entity manipulation after the image file loads into memory
            // Save the size of the loaded image for use later
            self.sprite.width = this.width;
            self.sprite.height = this.height;

            if (applySize || applySize === undefined) {
                if (frameCount) {
                    self.setSize(this.width / frameCount, this.height);
                } else {
                    self.setSize(this.width, this.height);
                }
            }

            if (applyBound || applyBound === undefined) {
                if (frameCount) {
                    self.setBound(0 - self.anchor.x, 0 - self.anchor.y, this.width / frameCount, this.height);
                } else {
                    self.setBound(0 - self.anchor.x, 0 - self.anchor.y, this.width, this.height);
                }
            }

            if (frameCount && timeBetweenFrames) {
                self.sprite.currentFrame = 0;
                self.sprite.frameCount = frameCount;
                self.sprite.timeBetweenFrames = Math.round(timeBetweenFrames);

                self.animation = setInterval(function() {
                    if (self.sprite.currentFrame < self.sprite.frameCount - 1) {
                        self.sprite.currentFrame += 1;
                    } else {
                        self.sprite.currentFrame = 0;
                    }
                }, self.sprite.timeBetweenFrames);
            }
        };

        this.sprite.img.src = fileLocation;

        return this;
    };

    this.pauseAnimation = function() {
        if (this.sprite.animation) {
            clearInterval(this.sprite.animation);
        }

        return this;
    };

    this.setOpacity = function(opacity) {
        this.opacity = opacity;

        return this;
    };

    this.fadeOut = function(increment) {
        if (this.opacity > 0) {
            this.opacity -= increment;
        } else {
            this.opacity = 0;
        }

        return this;
    };

    this.fadeIn = function(increment) {
        if (this.opacity < 1) {
            this.opacity += increment;
        } else {
            this.opacity = 1;
        }

        return this;
    };

    this.buffer = function() { // Add to the buffer to be drawn later
        if (!this.deleted) {
            l.globals.zBuffer.push(this);
        }

        return this;
    };

    this.flip = function(direction) {
        this.flipped = direction;

        return this;
    };

    this.unflip = function() {
        if (this.flipped == 'horizontal') {
            if (this.flipped == 'both') {
                this.flipped = 'vertical';
            } else {
                delete this.flipped;
            }
        } else if (this.flipped == 'vertical') {
            if (this.flipped == 'both') {
                this.flipped = 'vertical';
            } else {
                delete this.flipped;
            }
        } else if (this.flipped == 'both') {
            delete this.flipped;
        }

        return this;
    };

    this.hud = function() {
        this.drawMode = 'hud';

        return this;
    };

    this.draw = function() {
        if (this.drawMode == 'hud') {
            this.cameraX = 0;
            this.cameraY = 0;
        } else {
            this.cameraX = l.globals.camera.x;
            this.cameraY = l.globals.camera.y;
        }

        if (!this.deleted) {
            l.globals.ctx.globalAlpha = this.opacity; // 1 is the default opacity

            if (this.flipped || this.rotation) {
                l.globals.ctx.save();

                if (this.flipped !== 'undefined') {
                    if (this.flipped == 'horizontal') {
                        l.globals.ctx.translate(Math.round(this.x - this.anchor.x * 2 + this.width - this.cameraX), Math.round(this.y - this.cameraY));
                        l.globals.ctx.scale(-1, 1);
                    } else if (this.flipped == 'vertical') {
                        l.globals.ctx.translate(Math.round(this.x - this.cameraX), Math.round(this.y - this.anchor.y * 2 + this.height - this.cameraY));
                        l.globals.ctx.scale(1, -1);
                    } else if (this.flipped == 'both') {
                        l.globals.ctx.translate(Math.round(this.x - this.anchor.x * 2 + this.width - this.cameraX), Math.round(this.y - this.anchor.y * 2 + this.height - this.cameraY));
                        l.globals.ctx.scale(-1, -1);
                    }
                }

                if (this.rotation) {
                    l.globals.ctx.translate(Math.round(this.x - this.cameraX), Math.round(this.y - this.cameraY));
                    l.globals.ctx.rotate(this.rotation * Math.PI / 180 * -1);
                }

                if (this.sprite.frameCount) {
                    l.globals.ctx.drawImage(this.sprite.img, this.sprite.currentFrame * (this.sprite.width / this.sprite.frameCount), 0, this.sprite.width / this.sprite.frameCount, this.sprite.height, Math.round(0 - this.anchor.x), Math.round(0 - this.anchor.y), this.sprite.width / this.sprite.frameCount, this.sprite.height);
                } else {
                    l.globals.ctx.drawImage(this.sprite.img, Math.round(0 - this.anchor.x), Math.round(0 - this.anchor.y));
                }

                l.globals.ctx.restore();
            } else {
                if (this.sprite.frameCount) {
                    l.globals.ctx.drawImage(this.sprite.img, this.sprite.currentFrame * (this.sprite.width / this.sprite.frameCount), 0, this.sprite.width / this.sprite.frameCount, this.sprite.height, Math.round(this.x - this.anchor.x - this.cameraX), Math.round(this.y - this.anchor.y - this.cameraY), this.sprite.width / this.sprite.frameCount, this.sprite.height);
                } else {
                    l.globals.ctx.drawImage(this.sprite.img, Math.round(this.x - this.anchor.x - this.cameraX), Math.round(this.y - this.anchor.y - this.cameraY));
                }
            }
        }

        l.globals.ctx.globalAlpha = 1; // Reset the global opacity before returning

        return this;
    };

    this.snapTo = function(x, y) {
        this.x = x;
        this.y = y;

        return this;
    };

    this.moveHorizontal = function(speed) {
        this.recordDifference('horizontal', speed);

        this.x += speed;

        return this;
    };

    this.moveVertical = function(speed) {
        this.recordDifference('vertical', speed);

        this.y += speed;

        return this;
    };

    this.moveTo = function(x, y, speed) {
        var horizontal = x - this.x;
        var vertical = y - this.y;
        var total = Math.sqrt(horizontal * horizontal + vertical * vertical);

        var xSpeed = horizontal / total * speed;
        var ySpeed = vertical / total * speed;

        if (total > 1) {
            this.moveHorizontal(xSpeed);
            this.moveVertical(ySpeed);
        }

        return this;
    };

    this.moveToward = function(entity, speed) {
        if (!entity.deleted) {
            var horizontal = entity.x - this.x;
            var vertical = entity.y - this.y;
            var total = Math.sqrt(horizontal * horizontal + vertical * vertical);

            var xSpeed = horizontal / total * speed;
            var ySpeed = vertical / total * speed;

            if (total > 1) {
                this.moveHorizontal(xSpeed);
                this.moveVertical(ySpeed);
            }
        }

        return this;
    };

    this.moveTowardDegree = function(degree, speed) {
        this.moveHorizontal(Math.cos(degree * Math.PI / 180) * speed);
        this.moveVertical(-Math.sin(degree * Math.PI / 180) * speed);

        return this;
    };

    this.contain = function(xMin, xMax, yMin, yMax) {
        if (!xMin && !xMax && !yMin && !yMax) {
            xMin = 0;
            xMax = l.globals.room.width;
            yMin = 0;
            yMax = l.globals.room.height;
        }

        if (this.x + this.bound.x < xMin) {
            this.momentum.x = 0;
            this.x = xMin - this.bound.x;
        } else if (this.x + this.bound.x + this.bound.width > xMax) {
            this.momentum.x = 0;
            this.x = xMax - this.bound.width - this.bound.x;
        }

        if (this.y + this.bound.y < yMin) {
            this.momentum.y = 0;
            this.y = yMin - this.bound.y;
        } else if (this.y + this.bound.y + this.bound.height > yMax) {
            this.momentum.y = 0;
            this.y = yMax - this.bound.height - this.bound.y;
        }

        return this;
    };

    this.stick = function(xMin, xMax, yMin, yMax) { // Same as contain but causes objects to stick to the edge they collide with
        if (!xMin && !xMax && !yMin && !yMax) {
            xMin = 0;
            xMax = l.globals.room.width;
            yMin = 0;
            yMax = l.globals.room.height;
        }

        if (this.x + this.bound.x < xMin) {
            this.freeze();
            this.stuck = true;
            this.x = xMin - this.bound.x;
        } else if (this.x + this.bound.x + this.bound.width > xMax) {
            this.freeze();
            this.stuck = true;
            this.x = xMax - this.bound.width - this.bound.x;
        }

        if (this.y + this.bound.y < yMin) {
            this.freeze();
            this.stuck = true;
            this.y = yMin - this.bound.y;
        } else if (this.y + this.bound.y + this.bound.height > yMax) {
            this.freeze();
            this.stuck = true;
            this.y = yMax - this.bound.height - this.bound.y;
        }

        return this;
    };

    this.setFriction = function(movement, rotation) {
        if (rotation) {
            this.friction = {
                x: 0,
                y: 0,
                movement: movement,
                rotation: rotation
            };
        } else {
            this.friction = {
                x: 0,
                y: 0,
                movement: movement,
                rotation: movement
            };
        }

        return this;
    };

    this.setGravity = function(amount) {
        this.gravity = amount;

        return this;
    };

    this.freeze = function() { // Instantly kill all momentum and rotation
        this.momentum = {
            x: 0,
            y: 0,
            rotation: 0
        };
        this.momentum.rotation = 0;

        return this;
    };

    this.spin = function(force) { // Spins the entity with provided force (useful for contant rotation like a windmill)
        this.momentum.rotation = force;

        return this;
    };

    this.pushTowardDegree = function(degree, force) {
        this.momentum.x = Math.cos(degree * Math.PI / 180) * force;
        this.momentum.y = -Math.sin(degree * Math.PI / 180) * force;

        return this;
    };

    this.pushHorizontal = function(force) {
        this.momentum.x += force;

        return this;
    };

    this.pushVertical = function(force) {
        this.momentum.y += force;

        return this;
    };

    this.scatter = function(maxForce) {
        this.momentum.x = Math.random() * (maxForce - (maxForce * -1)) + (maxForce * -1);
        this.momentum.y = Math.random() * (maxForce - (maxForce * -1)) + (maxForce * -1);

        return this;
    };

    this.pullTo = function(x, y, force) {
        var horizontal = x - this.x;
        var vertical = y - this.y;
        var total = Math.sqrt(horizontal * horizontal + vertical * vertical);

        var xSpeed = horizontal / total * force;
        var ySpeed = vertical / total * force;

        if (total > 1) {
            this.pushHorizontal(xSpeed);
            this.pushVertical(ySpeed);
        }

        return this;
    };

    this.pullToward = function(entity, force) {
        if (!entity.deleted) {
            var horizontal = entity.x - this.x;
            var vertical = entity.y - this.y;
            var total = Math.sqrt(horizontal * horizontal + vertical * vertical);

            var xSpeed = horizontal / total * force;
            var ySpeed = vertical / total * force;

            if (total > 1) {
                this.pushHorizontal(xSpeed);
                this.pushVertical(ySpeed);
            }
        }

        return this;
    };

    this.bounce = function(xMin, xMax, yMin, yMax) { // Bounce off supplied boundaries (or the room edges if nothing is supplied)
        if (!xMin && !xMax && !yMin && !yMax) {
            xMin = 0;
            xMax = l.globals.room.width;
            yMin = 0;
            yMax = l.globals.room.height;
        }

        if (this.x + this.bound.x <= xMin) {
            this.x = xMin - this.bound.x;
            this.momentum.x = -this.momentum.x;
        } else if (this.x + this.bound.x + this.bound.width >= xMax) {
            this.x = xMax - this.bound.width - this.bound.x;
            this.momentum.x = -this.momentum.x;
        }

        if (this.y + this.bound.y <= yMin) {
            this.y = yMin - this.bound.y;
            this.momentum.y = -this.momentum.y;
        } else if (this.y + this.bound.y + this.bound.height >= yMax) {
            this.y = yMax - this.bound.height - this.bound.y;
            this.momentum.y = -this.momentum.y;
        }

        return this;
    };

    this.applyPhysics = function() // Run to continuously update the friction of objects influenced by physics
        {
            if (!this.stuck) {
                if (this.momentum.x || this.momentum.y) {
                    if (Math.abs(this.momentum.x) > Math.abs(this.momentum.y)) { // Enable natural slowdown so horizontal movement doesn't stop before vertical
                        this.friction.x = this.friction.movement;
                        this.friction.y = Math.abs(this.momentum.y / this.momentum.x * this.friction.movement);
                    } else {
                        this.friction.x = Math.abs(this.momentum.x / this.momentum.y * this.friction.movement);
                        this.friction.y = this.friction.movement;
                    }
                }

                if (this.momentum.x !== 0) // Horizontal motion
                {
                    this.moveHorizontal(this.momentum.x);

                    if (this.momentum.x < 0) // Moving left
                    {
                        this.momentum.x += this.friction.x;

                        if (this.momentum.x > 0) {
                            this.momentum.x = 0;
                        }
                    } else if (this.momentum.x > 0) // Moving right
                    {
                        this.momentum.x -= this.friction.x;

                        if (this.momentum.x < 0) {
                            this.momentum.x = 0;
                        }
                    }
                }

                if (this.momentum.y !== 0) // Vertical motion
                {
                    this.moveVertical(this.momentum.y);

                    if (this.momentum.y < 0) // Moving up
                    {
                        this.momentum.y += this.friction.y;

                        if (this.momentum.y > 0) {
                            this.momentum.y = 0;
                        }
                    } else if (this.momentum.y > 0) // Moving down
                    {
                        this.momentum.y -= this.friction.y;

                        if (this.momentum.y < 0) {
                            this.momentum.y = 0;
                        }
                    }
                }

                if (this.momentum.rotation !== 0) {
                    this.rotation += this.momentum.rotation;

                    if (this.momentum.rotation < 0) {
                        this.momentum.rotation += this.friction.rotation;

                        if (this.momentum.rotation > 0) {
                            this.momentum.rotation = 0;
                        }
                    } else if (this.momentum.rotation > 0) {
                        this.momentum.rotation -= this.friction.rotation;

                        if (this.momentum.rotation < 0) {
                            this.momentum.rotation = 0;
                        }
                    }
                }

                if (this.y + this.bound.height < l.globals.room.height) { // Ghetto gravity
                    this.pushVertical(this.gravity);
                }

                return this;
            };

        }

};
