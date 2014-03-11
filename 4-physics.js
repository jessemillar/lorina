l.physics = new Object() // Group the physics functions

l.game.physics = new Object() // Group the game's physics values

l.physics.update = function(name)
{
    if (l.entities[name])
    {
        l.entities[name].physics.momentum.total = Math.abs(l.entities[name].physics.momentum.x) + Math.abs(l.entities[name].physics.momentum.y)

        if (l.entities[name].physics.momentum.x !== 0) // Horizontal motion
        {
            if (l.entities[name].physics.momentum.x < 0) // Moving to the left
            {
                l.move.left(name, Math.abs(l.entities[name].physics.momentum.x))
                l.entities[name].physics.momentum.x += l.game.physics.friction
                if (l.entities[name].physics.momentum.x > 0)
                {
                    l.entities[name].physics.momentum.x = 0
                }
            }
            else if (l.entities[name].physics.momentum.x > 0) // Moving to the right
            {
                l.move.right(name, Math.abs(l.entities[name].physics.momentum.x))
                l.entities[name].physics.momentum.x -= l.game.physics.friction
                if (l.entities[name].physics.momentum.x < 0)
                {
                    l.entities[name].physics.momentum.x = 0
                }
            }
        }

        if (l.entities[name].physics.momentum.y !== 0) // Vertical motion
        {
            if (l.entities[name].physics.momentum.y < 0) // Moving up
            {
                l.move.up(name, Math.abs(l.entities[name].physics.momentum.y))
                l.entities[name].physics.momentum.y += l.game.physics.friction
                if (l.entities[name].physics.momentum.y > 0)
                {
                    l.entities[name].physics.momentum.y = 0
                }
            }
            else if (l.entities[name].physics.momentum.y > 0) // Moving down
            {
                l.move.down(name, Math.abs(l.entities[name].physics.momentum.y))
                l.entities[name].physics.momentum.y -= l.game.physics.friction
                if (l.entities[name].physics.momentum.y < 0)
                {
                    l.entities[name].physics.momentum.y = 0
                }
            }
        }
    }
    else
    {        
        for (var i in l.entities)
        {
            if (l.entities[i].category == name)
            {
                l.physics.update(i)
            }
        }
    }
}

l.physics.friction = function(friction)
{
    l.game.physics.friction = friction
}

l.physics.momentum = new Object() // Group the momentum functions

l.physics.momentum.stop = function(name)
{
    if (l.entities[name])
    {
        l.entities[name].physics.momentum.x = 0
        l.entities[name].physics.momentum.y = 0
    }
    else
    {        
        for (var i in l.entities)
        {
            if (l.entities[i].category == name)
            {
                l.physics.momentum.stop(i)
            }
        }
    }
}

l.physics.momentum.transfer = function(a, b)
{
    l.entities[b].physics.momentum.x = l.entities[a].physics.momentum.x
    l.entities[b].physics.momentum.y = l.entities[a].physics.momentum.y
}

l.physics.push = new Object() // Group the function that apply a push to an object

l.physics.push.up = function(name, force)
{
    if (l.entities[name])
    {
        l.entities[name].physics.momentum.y -= force
    }
    else
    {        
        for (var i in l.entities)
        {
            if (l.entities[i].category == name)
            {
                l.physics.push.up(i, force)
            }
        }
    }
}

l.physics.push.down = function(name, force)
{
    if (l.entities[name])
    {
        l.entities[name].physics.momentum.y += force
    }
    else
    {        
        for (var i in l.entities)
        {
            if (l.entities[i].category == name)
            {
                l.physics.push.down(i, force)
            }
        }
    }
}

l.physics.push.left = function(name, force)
{
    if (l.entities[name])
    {
        l.entities[name].physics.momentum.x -= force
    }
    else
    {        
        for (var i in l.entities)
        {
            if (l.entities[i].category == name)
            {
                l.physics.push.left(i, force)
            }
        }
    }
}

l.physics.push.right = function(name, force)
{
    if (l.entities[name])
    {
        l.entities[name].physics.momentum.x += force
    }
    else
    {        
        for (var i in l.entities)
        {
            if (l.entities[i].category == name)
            {
                l.physics.push.right(i, force)
            }
        }
    }
}

l.physics.pull = new Object() // Since the .toward() function act more like a gravity pull, put it in this "folder"

l.physics.pull.to = function(name, x, y, force)
{
    if (l.entities[name])
    {
        var speedX = l.tool.measure.x(name, x) / l.tool.measure.total(name, x, y) * force
        var speedY = l.tool.measure.y(name, y) / l.tool.measure.total(name, x, y) * force

        if (l.tool.measure.total(name, x, y) > 0)
        {
            if (l.entities[name].anchor.x < x && l.entities[name].anchor.y < y)
            {
                l.physics.push.right(name, speedX)
                l.physics.push.down(name, speedY)
            }
            else if (l.entities[name].anchor.x > x && l.entities[name].anchor.y < y)
            {
                l.physics.push.left(name, speedX)
                l.physics.push.down(name, speedY)
            }
            else if (l.entities[name].anchor.x < x && l.entities[name].anchor.y > y)
            {
                l.physics.push.right(name, speedX)
                l.physics.push.up(name, speedY)
            }
            else if (l.entities[name].anchor.x > x && l.entities[name].anchor.y > y)
            {
                l.physics.push.left(name, speedX)
                l.physics.push.up(name, speedY)
            }
        }
    }
    else
    {        
        for (var i in l.entities)
        {
            if (l.entities[i].category == name)
            {
                l.physics.pull.to(i, x, y, force)
            }
        }
    }
}

l.physics.pull.toward = function(a, b, force)
{
    if (l.entities[a])
    {
        var speedX = l.tool.measure.x(a, b) / l.tool.measure.total(a, b) * force
        var speedY = l.tool.measure.y(a, b) / l.tool.measure.total(a, b) * force

        if (l.tool.measure.total(a, b) > 0)
        {
            if (l.entities[a].anchor.x < l.entities[b].anchor.x && l.entities[a].anchor.y < l.entities[b].anchor.y)
            {
                l.physics.push.right(a, speedX)
                l.physics.push.down(a, speedY)
            }
            else if (l.entities[a].anchor.x > l.entities[b].anchor.x && l.entities[a].anchor.y < l.entities[b].anchor.y)
            {
                l.physics.push.left(a, speedX)
                l.physics.push.down(a, speedY)
            }
            else if (l.entities[a].anchor.x < l.entities[b].anchor.x && l.entities[a].anchor.y > l.entities[b].anchor.y)
            {
                l.physics.push.right(a, speedX)
                l.physics.push.up(a, speedY)
            }
            else if (l.entities[a].anchor.x > l.entities[b].anchor.x && l.entities[a].anchor.y > l.entities[b].anchor.y)
            {
                l.physics.push.left(a, speedX)
                l.physics.push.up(a, speedY)
            }
        }
    }
    else
    {        
        for (var i in l.entities)
        {
            if (l.entities[i].category == a)
            {
                l.physics.pull.toward(i, b, force)
            }
        }
    }
}

l.physics.scatter = function(name, force)
{
    l.physics.push.up(name, l.tool.random(-force, force))
    l.physics.push.right(name, l.tool.random(-force, force))
}

l.physics.bounce = function(name, xMin, xMax, yMin, yMax)
{
    if (!xMin && !xMax && !yMin && !yMax)
    {
        xMin = 0
        xMax = l.canvas.width
        yMin = 0
        yMax = l.canvas.height
    }

    if (l.entities[name])
    {
        if (l.entities[name].x <= xMin)
        {
			l.entities[name].x = xMin
            l.entities[name].physics.momentum.x = -l.entities[name].physics.momentum.x
        }
		else if (l.entities[name].x + l.entities[name].width >= xMax)
		{
			l.entities[name].x = xMax - l.entities[name].width
			l.entities[name].physics.momentum.x = -l.entities[name].physics.momentum.x
		}

        if (l.entities[name].y <= yMin)
        {
			l.entities[name].y = yMin
            l.entities[name].physics.momentum.y = -l.entities[name].physics.momentum.y
        }
		else if (l.entities[name].y + l.entities[name].height >= yMax)
		{
			l.entities[name].y = yMax - l.entities[name].height
			l.entities[name].physics.momentum.y = -l.entities[name].physics.momentum.y
		}
    }
    else
    {        
        for (var i in l.entities)
        {
            if (l.entities[i].category == name)
            {
                l.physics.bounce(i, xMin, xMax, yMin, yMax)
            }
        }
    }
}