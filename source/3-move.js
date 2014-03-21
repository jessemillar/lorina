l.move = new Object() // Create an object to organize the move functions into

l.move.snap = function(name, x, y)
{
    if (l.entities[name])
    {
        if (l.entities[name].anchor.offset.x)
        {
            l.entities[name].x = x - l.entities[name].anchor.offset.x   
        }
        else
        {
            l.entities[name].x = x
        }

        if (l.entities[name].anchor.offset.y)
        {
            l.entities[name].y = y - l.entities[name].anchor.offset.y   
        }
        else
        {
            l.entities[name].y = y
        }
        
        l.object.update(name)
    }
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == name)
            {
                l.move.snap(thingy[i], x, y)
            }
        }
    }
}

l.move.up = function(name, speed)
{
    if (l.entities[name])
    {
        l.entities[name].y -= speed / 60
        l.object.update(name)
    }
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == name)
            {
                l.move.up(thingy[i], speed)
            }
        }
    }
}

l.move.down = function(name, speed)
{
    if (l.entities[name])
    {
        l.entities[name].y += speed / 60
        l.object.update(name)
    }
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == name)
            {
                l.move.down(thingy[i], speed)
            }
        }
    }
}

l.move.left = function(name, speed)
{
    if (l.entities[name])
    {
        l.entities[name].x -= speed / 60
        l.object.update(name)
    }
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == name)
            {
                l.move.left(thingy[i], speed)
            }
        }
    }
}

l.move.right = function(name, speed)
{
    if (l.entities[name])
    {
        l.entities[name].x += speed / 60
        l.object.update(name)
    }
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == name)
            {
                l.move.right(thingy[i], speed)
            }
        }
    }
}

l.move.to = function(name, x, y, speed)
{
    if (l.entities[name])
    {
        var speedX = l.tool.measure.x(name, x) / l.tool.measure.total(name, x, y) * speed
        var speedY = l.tool.measure.y(name, y) / l.tool.measure.total(name, x, y) * speed

        if (l.tool.measure.total(name, x, y) > 0)
        {
            if (l.entities[name].anchor.x < x && l.entities[name].anchor.y < y)
            {
                l.move.right(name, speedX)
                l.move.down(name, speedY)
            }
            else if (l.entities[name].anchor.x > x && l.entities[name].anchor.y < y)
            {
                l.move.left(name, speedX)
                l.move.down(name, speedY)
            }
            else if (l.entities[name].anchor.x < x && l.entities[name].anchor.y > y)
            {
                l.move.right(name, speedX)
                l.move.up(name, speedY)
            }
            else if (l.entities[name].anchor.x > x && l.entities[name].anchor.y > y)
            {
                l.move.left(name, speedX)
                l.move.up(name, speedY)
            }
        }
    }
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == name)
            {
                l.move.to(thingy[i], x, y, speed)
            }
        }
    }
}

l.move.toward = function(a, b, speed)
{
    if (l.entities[a])
    {
        var speedX = l.tool.measure.x(a, b) / l.tool.measure.total(a, b) * speed
        var speedY = l.tool.measure.y(a, b) / l.tool.measure.total(a, b) * speed

        if (l.tool.measure.total(a, b) > 0)
        {
            if (l.entities[a].anchor.x < l.entities[b].anchor.x && l.entities[a].anchor.y < l.entities[b].anchor.y)
            {
                l.move.right(a, speedX)
                l.move.down(a, speedY)
            }
            else if (l.entities[a].anchor.x > l.entities[b].anchor.x && l.entities[a].anchor.y < l.entities[b].anchor.y)
            {
                l.move.left(a, speedX)
                l.move.down(a, speedY)
            }
            else if (l.entities[a].anchor.x < l.entities[b].anchor.x && l.entities[a].anchor.y > l.entities[b].anchor.y)
            {
                l.move.right(a, speedX)
                l.move.up(a, speedY)
            }
            else if (l.entities[a].anchor.x > l.entities[b].anchor.x && l.entities[a].anchor.y > l.entities[b].anchor.y)
            {
                l.move.left(a, speedX)
                l.move.up(a, speedY)
            }
        }
    }
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == a)
            {
                l.move.toward(thingy[i], b, speed)
            }
        }
    }
}