l.group = function() {
    this.database = [];

    this.add = function(entity) {
        this.database.push(entity);
    };

    this.remove = function(entity) {
        var i = this.database.length;
        while (i--) {
            if (this.database[i] == entity) {
                this.database.splice(i, 1);
                break;
            }
        }
    };

    this.debug = function(color) {
        var i = this.database.length;
        while (i--) {
            this.database[i].debug(color);
        }

        return this;
    };

    this.delete = function() {
        var i = this.database.length;
        while (i--) {
            this.database[i].delete();
        }

        return this;
    };

    this.banish = function() {
        var i = this.database.length;
        while (i--) {
            this.database[i].banish();
        }

        return this;
    };

    this.setTrait = function(name, value) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setTrait(name, value);
        }

        return this;
    };

    this.deleteTrait = function(name) {
        var i = this.database.length;
        while (i--) {
            this.database[i].deleteTrait(name);
        }

        return this;
    };

    this.setPosition = function(x, y) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setPosition(x, y);
        }

        return this;
    };

    this.setAnchor = function(x, y) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setAnchor(x, y);
        }

        return this;
    };

    this.setSize = function(width, height, applyBound) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setSize(width, height, applyBound);
        }

        return this;
    };

    this.setStretch = function(width, height, applySize, applyBound) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setStretch(width, height, applySize, applyBound);
        }

        return this;
    };

    this.setBound = function(x, y, width, height) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setbound(x, y, width, height);
        }

        return this;
    };

    this.rotate = function(amount) {
        var i = this.database.length;
        while (i--) {
            this.database[i].rotate(amount);
        }

        return this;
    };

    this.rotateTo = function(degree) {
        var i = this.database.length;
        while (i--) {
            this.database[i].rotateTo(degree);
        }

        return this;
    };

    this.steer = function() {
        var i = this.database.length;
        while (i--) {
            this.database[i].steer();
        }

        return this;
    };

    this.setSprite = function(location, applySize, applyBound) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setSprite(location, applySize, applyBound);
        }

        return this;
    };

    this.setAnimation = function(count, timer) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setAnimation(count, timer);
        }

        return this;
    };

    this.pauseAnimation = function() {
        var i = this.database.length;
        while (i--) {
            this.database[i].pauseAnimation();
        }

        return this;
    };

    this.setOpacity = function(opacity) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setOpacity(opacity);
        }

        return this;
    };

    this.fadeOut = function(increment) {
        var i = this.database.length;
        while (i--) {
            this.database[i].fadeOut(increment);
        }

        return this;
    };

    this.fadeIn = function(increment) {
        var i = this.database.length;
        while (i--) {
            this.database[i].fadeIn(increment);
        }

        return this;
    };

    this.buffer = function() {
        var i = this.database.length;
        while (i--) {
            this.database[i].buffer();
        }

        return this;
    };

    this.flip = function(direction) {
        var i = this.database.length;
        while (i--) {
            this.database[i].flip(direction);
        }

        return this;
    };

    this.unflip = function() {
        var i = this.database.length;
        while (i--) {
            this.database[i].unflip();
        }

        return this;
    };

    this.hud = function() {
        var i = this.database.length;
        while (i--) {
            this.database[i].hud();
        }

        return this;
    };

    this.draw = function() // Draw everything in the group while removing deleted objects so the garbage collector can work
    {
        var i = this.database.length;
        while (i--) {
            if (!this.database[i].deleted) {
                this.database[i].draw();
            } else {
                this.database.splice(i, 1);
            }
        }

        return this;
    };

    this.snapTo = function(x, y) {
        var i = this.database.length;
        while (i--) {
            this.database[i].snapTo(x, y);
        }

        return this;
    };

    this.moveHorizontal = function(speed) {
        var i = this.database.length;
        while (i--) {
            this.database[i].moveHorizontal(speed);
        }

        return this;
    };

    this.moveVertical = function(speed) {
        var i = this.database.length;
        while (i--) {
            this.database[i].moveVertical(speed);
        }

        return this;
    };

    this.moveTo = function(x, y, speed) {
        var i = this.database.length;
        while (i--) {
            this.database[i].moveTo(x, y, speed);
        }

        return this;
    };

    this.moveToward = function(entity, speed) {
        var i = this.database.length;
        while (i--) {
            this.database[i].moveToward(entity, speed);
        }

        return this;
    };

    this.moveTowardDegree = function(degree, speed) {
        var i = this.database.length;
        while (i--) {
            this.database[i].moveTowardDegree(degree, speed);
        }

        return this;
    };

    this.contain = function(xMin, xMax, yMin, yMax) {
        var i = this.database.length;
        while (i--) {
            this.database[i].contain(xMin, xMax, yMin, yMax);
        }

        return this;
    };

    this.setFriction = function(friction) {
        var i = this.database.length;
        while (i--) {
            this.database[i].setFriction(friction);
        }

        return this;
    };

    this.freeze = function() {
        var i = this.database.length;
        while (i--) {
            this.database[i].freeze();
        }

        return this;
    };

    this.spin = function(force) {
        var i = this.database.length;
        while (i--) {
            this.database[i].spin(force);
        }

        return this;
    };

    this.pushHorizontal = function(force) {
        var i = this.database.length;
        while (i--) {
            this.database[i].pushHorizontal(force);
        }

        return this;
    };

    this.pushVertical = function(force) {
        var i = this.database.length;
        while (i--) {
            this.database[i].pushVertical(force);
        }

        return this;
    };

    this.scatter = function(maxForce) {
        var i = this.database.length;
        while (i--) {
            this.database[i].scatter(maxForce);
        }

        return this;
    };

    this.pullTo = function(x, y, force) {
        var i = this.database.length;
        while (i--) {
            this.database[i].pullTo(x, y, force);
        }

        return this;
    };

    this.pullToward = function(entity, force) {
        var i = this.database.length;
        while (i--) {
            this.database[i].pullToward(entity, force);
        }

        return this;
    };

    this.bounce = function(xMin, xMax, yMin, yMax) {
        var i = this.database.length;
        while (i--) {
            this.database[i].bounce(xMin, xMax, yMin, yMax);
        }

        return this;
    };

    this.applyPhysics = function() // Run to continuously update the friction of objects influenced by physics
    {
        var i = this.database.length;
        while (i--) {
            this.database[i].applyPhysics();
        }

        return this;
    };
};