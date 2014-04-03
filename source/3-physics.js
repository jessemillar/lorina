var Physics = function()
{
    this.friction = function(friction)
    {
        this.friction = friction
    }

    this.freeze = function(name)
    {
        this.momentum.x = 0
        this.momentum.y = 0
    }

    /*
    this.momentum.transfer = function(a, b)
    {
        this.entities[b].momentum.x = this.entities[a].momentum.x
        this.entities[b].momentum.y = this.entities[a].momentum.y
    }
    */

    this.pull = new Object() // Since the .toward() function act more like a gravity pull, put it in this "folder"

    this.pull.to = function(x, y, force)
    {
        var speedX = this.tool.measure.x(x) / this.tool.measure.total(x, y) * force
        var speedY = this.tool.measure.y(y) / this.tool.measure.total(x, y) * force

        if (this.tool.measure.total(x, y) > 0)
        {
            if (this.anchor.x < x && this.anchor.y < y)
            {
                this.push.right(speedX)
                this.push.down(speedY)
            }
            else if (this.anchor.x > x && this.anchor.y < y)
            {
                this.push.left(speedX)
                this.push.down(speedY)
            }
            else if (this.anchor.x < x && this.anchor.y > y)
            {
                this.push.right(speedX)
                this.push.up(speedY)
            }
            else if (this.anchor.x > x && this.anchor.y > y)
            {
                this.push.left(speedX)
                this.push.up(speedY)
            }
        }
    }

    this.pull.toward = function(a, b, force)
    {
        var speedX = this.tool.measure.x(a, b) / this.tool.measure.total(a, b) * force
        var speedY = this.tool.measure.y(a, b) / this.tool.measure.total(a, b) * force

        if (this.tool.measure.total(a, b) > 0)
        {
            if (this.entities[a].anchor.x < this.entities[b].anchor.x && this.entities[a].anchor.y < this.entities[b].anchor.y)
            {
                this.push.right(a, speedX)
                this.push.down(a, speedY)
            }
            else if (this.entities[a].anchor.x > this.entities[b].anchor.x && this.entities[a].anchor.y < this.entities[b].anchor.y)
            {
                this.push.left(a, speedX)
                this.push.down(a, speedY)
            }
            else if (this.entities[a].anchor.x < this.entities[b].anchor.x && this.entities[a].anchor.y > this.entities[b].anchor.y)
            {
                this.push.right(a, speedX)
                this.push.up(a, speedY)
            }
            else if (this.entities[a].anchor.x > this.entities[b].anchor.x && this.entities[a].anchor.y > this.entities[b].anchor.y)
            {
                this.push.left(a, speedX)
                this.push.up(a, speedY)
            }
        }
    }

    /*
    this.scatter = function(force)
    {
        this.pushUp(this.tool.random(-force, force))
        this.pushRight(this.tool.random(-force, force))
    }
    */

    this.update = function()
    {
        this.momentum.total = Math.abs(this.momentum.x) + Math.abs(this.momentum.y)

        if (this.momentum.x !== 0) // Horizontal motion
        {
            if (this.momentum.x < 0) // Moving to the left
            {
                this.move.left(Math.abs(this.momentum.x))
                this.momentum.x += this.friction
                if (this.momentum.x > 0)
                {
                    this.momentum.x = 0
                }
            }
            else if (this.momentum.x > 0) // Moving to the right
            {
                this.move.right(Math.abs(this.momentum.x))
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
                this.move.up(Math.abs(this.momentum.y))
                this.momentum.y += this.friction
                if (this.momentum.y > 0)
                {
                    this.momentum.y = 0
                }
            }
            else if (this.momentum.y > 0) // Moving down
            {
                this.move.down(Math.abs(this.momentum.y))
                this.momentum.y -= this.friction
                if (this.momentum.y < 0)
                {
                    this.momentum.y = 0
                }
            }
        }
    }
}