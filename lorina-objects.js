l.entities = new Object() // The object that keeps track of our game objects

l.object = new Object() // Group the object functions

l.object.from = function(name, x, y)
{
    var count = l.prototype.count(name)

    if (l.prototype.entities[name])
    {
        l.entities[name + count] = new Object()
            l.entities[name + count].prototype = name
            l.entities[name + count].x = x - l.prototype.entities[name].anchor.offset.x
            l.entities[name + count].y = y - l.prototype.entities[name].anchor.offset.y
            l.entities[name + count].width = l.prototype.entities[name].width
            l.entities[name + count].height = l.prototype.entities[name].height
            l.entities[name + count].bounding = new Object()
                l.entities[name + count].bounding.x = x
                l.entities[name + count].bounding.y = y
                l.entities[name + count].bounding.offset = new Object()
                    l.entities[name + count].bounding.offset.x = l.prototype.entities[name].bounding.offset.x
                    l.entities[name + count].bounding.offset.y = l.prototype.entities[name].bounding.offset.y
                l.entities[name + count].bounding.width = l.prototype.entities[name].width
                l.entities[name + count].bounding.height = l.prototype.entities[name].height
            l.entities[name + count].anchor = new Object()
                l.entities[name + count].anchor.offset = new Object()
                    l.entities[name + count].anchor.offset.x = l.prototype.entities[name].anchor.offset.x
                    l.entities[name + count].anchor.offset.y = l.prototype.entities[name].anchor.offset.y
                l.entities[name + count].anchor.x = x
                l.entities[name + count].anchor.y = y
            l.entities[name + count].physics = new Object()
                l.entities[name + count].physics.momentum = new Object()
                    l.entities[name + count].physics.momentum.x = l.prototype.entities[name].physics.momentum.x
                    l.entities[name + count].physics.momentum.y = l.prototype.entities[name].physics.momentum.y
                    l.entities[name + count].physics.momentum.total = l.prototype.entities[name].physics.momentum.total
        
        if (l.prototype.entities[name].category)
        {
            l.entities[name + count].category = l.prototype.entities[name].category
        }

        if (l.prototype.entities[name].sprite)
        {
            l.entities[name + count].sprite = l.prototype.entities[name].sprite
        }

        if (l.prototype.entities[name].animate)
        {
            l.entities[name + count].animate = l.prototype.entities[name].animate
        }
    }
}

l.object.count = function(name)
{
    var thingy = Object.keys(l.entities)
    var count = 0
        
    for (var i = 0; i < thingy.length; i++)
    {
        if (l.entities[thingy[i]].category == name)
        {
            count++
        }
    }

    return count
}

l.object.delete = function(name)
{
    delete l.entities[name]
}

l.object.make = function(name, x, y, width, height)
{
    l.entities[name] = new Object()
        l.entities[name].x = x
        l.entities[name].y = y
        l.entities[name].width = width
        l.entities[name].height = height
        l.entities[name].bounding = new Object()
            l.entities[name].bounding.x = x
            l.entities[name].bounding.y = y
            l.entities[name].bounding.offset = new Object()
                l.entities[name].bounding.offset.x = 0
                l.entities[name].bounding.offset.y = 0
            l.entities[name].bounding.width = width
            l.entities[name].bounding.height = height
        l.entities[name].anchor = new Object()
            l.entities[name].anchor.offset = new Object()
                l.entities[name].anchor.offset.x = width / 2
                l.entities[name].anchor.offset.y = height / 2
            l.entities[name].anchor.x = x + width / 2
            l.entities[name].anchor.y = y + height / 2
        l.entities[name].physics = new Object()
            l.entities[name].physics.momentum = new Object()
                l.entities[name].physics.momentum.x = 0
                l.entities[name].physics.momentum.y = 0
                l.entities[name].physics.momentum.total = 0
}

l.object.categorize = function(name, category)
{
    l.entities[name].category = category
}

l.object.sprite = function(name, location, width, height, count, timer)
{
    l.preloader.queue()
    l.entities[name].sprite = new Image()
        l.entities[name].sprite.src = location
        l.entities[name].animate = new Object() // Group the non-src-related properties
            if (width)
            {
                l.entities[name].animate.width = width
            }
            else
            {
                l.entities[name].animate.width = l.entities[name].width
            }

            if (height)
            {
                l.entities[name].animate.height = height
            }
            else
            {
                l.entities[name].animate.height = l.entities[name].height
            }

            if (count)
            {
                l.entities[name].animate.count = count
                l.entities[name].animate.frame = 0
            }

            if (timer)
            {
                l.entities[name].animate.interval = l.object.animate(name, timer)
            }
    l.entities[name].sprite.onload = function()
    {
        l.preloader.update()
    }
}

l.object.animate = function(name, timer)
{
    setInterval(function()
    {
        if (l.entities[name].animate.frame < l.entities[name].animate.count - 1)
        {
            l.entities[name].animate.frame += 1
        }
        else
        {
            l.entities[name].animate.frame = 0
        }
    }, timer)
}

l.object.anchor = function(name, x, y)
{
    l.entities[name].x -= x
    l.entities[name].y -= y
    l.entities[name].anchor.offset.x = x
    l.entities[name].anchor.offset.y = y
    l.object.update(name)
}

l.object.bounding = function(name, x, y, width, height)
{
    l.entities[name].bounding.offset.x = x
    l.entities[name].bounding.offset.y = y
    l.entities[name].bounding.width = width
    l.entities[name].bounding.height = height
    l.object.update(name)
}

l.object.update = function(name) // Update "hidden" values that relate to the position of the object
{
    // Shift the anchor point (whether manually supplied or automatically centered) to reflect the object's new position
    l.entities[name].anchor.x = l.entities[name].x + l.entities[name].anchor.offset.x
    l.entities[name].anchor.y = l.entities[name].y + l.entities[name].anchor.offset.y
    // Shift the bounding box (whether manually supplied or automatically encompassing) to reflect the object's new position
    l.entities[name].bounding.x = l.entities[name].x + l.entities[name].bounding.offset.x
    l.entities[name].bounding.y = l.entities[name].y + l.entities[name].bounding.offset.y
}

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
        var speedX = l.measure.x(name, x) / l.measure.total(name, x, y) * speed
        var speedY = l.measure.y(name, y) / l.measure.total(name, x, y) * speed

        if (l.measure.total(name, x, y) > 0)
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
        var speedX = l.measure.x(a, b) / l.measure.total(a, b) * speed
        var speedY = l.measure.y(a, b) / l.measure.total(a, b) * speed

        if (l.measure.total(a, b) > 0)
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

l.measure = new Object() // Put the measurement functions into one object

l.measure.x = function(a, b)
{
    if (l.entities[a] && l.entities[b])
    {
        return Math.floor(Math.abs(l.entities[a].anchor.x - l.entities[b].anchor.x))        
    }
    else
    {
        return Math.floor(Math.abs(l.entities[a].anchor.x - b))
    }
}

l.measure.y = function(a, b)
{
    if (l.entities[a] && l.entities[b])
    {
        return Math.floor(Math.abs(l.entities[a].anchor.y - l.entities[b].anchor.y))
    }
    else
    {
        return Math.floor(Math.abs(l.entities[a].anchor.y - b))
    }
}

l.measure.total = function(a, b, q) // b and q double as x and y
{
    if (l.entities[a] && l.entities[b])
    {
        var horizontal = l.measure.x(a, b)
        var vertical = l.measure.y(a, b)
        return Math.floor(Math.sqrt(horizontal * horizontal + vertical * vertical))
    }
    else
    {
        var horizontal = l.measure.x(a, b)
        var vertical = l.measure.y(a, q)
        return Math.floor(Math.sqrt(horizontal * horizontal + vertical * vertical))
    }
}