l.entities = new Object() // The object that keeps track of our game objects

l.object = new Object() // Group the object functions

l.object.make = function(name, x, y, width, height)
{
    // Make it okay to make an object that's just a point
    if (!width)
    {
        width = 0
    }
    if (!height)
    {
        height = 0
    }

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
}

l.object.category = function(name, category)
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
            }

            if (timer)
            {
                l.entities[name].animate.frame = 0
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

l.move.toward = function(objectA, objectB, speed)
{
    if (l.entities[objectA])
    {
        var speedX = l.measure.x(objectA, objectB) / l.measure.total(objectA, objectB) * speed
        var speedY = l.measure.y(objectA, objectB) / l.measure.total(objectA, objectB) * speed

        if (l.measure.total(objectA, objectB) > 0)
        {
            if (l.entities[objectA].anchor.x < l.entities[objectB].anchor.x && l.entities[objectA].anchor.y < l.entities[objectB].anchor.y)
            {
                l.move.right(objectA, speedX)
                l.move.down(objectA, speedY)
            }
            else if (l.entities[objectA].anchor.x > l.entities[objectB].anchor.x && l.entities[objectA].anchor.y < l.entities[objectB].anchor.y)
            {
                l.move.left(objectA, speedX)
                l.move.down(objectA, speedY)
            }
            else if (l.entities[objectA].anchor.x < l.entities[objectB].anchor.x && l.entities[objectA].anchor.y > l.entities[objectB].anchor.y)
            {
                l.move.right(objectA, speedX)
                l.move.up(objectA, speedY)
            }
            else if (l.entities[objectA].anchor.x > l.entities[objectB].anchor.x && l.entities[objectA].anchor.y > l.entities[objectB].anchor.y)
            {
                l.move.left(objectA, speedX)
                l.move.up(objectA, speedY)
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
                l.move.toward(thingy[i], objectB, speed)
            }
        }
    }
}

l.measure = new Object() // Put the measurement functions into one object

l.measure.x = function(objectA, objectB)
{
    return Math.floor(Math.abs(l.entities[objectA].anchor.x - l.entities[objectB].anchor.x))
}

l.measure.y = function(objectA, objectB)
{
    return Math.floor(Math.abs(l.entities[objectA].anchor.y - l.entities[objectB].anchor.y))
}

l.measure.total = function(objectA, objectB)
{
    var x = l.measure.x(objectA, objectB)
    var y = l.measure.y(objectA, objectB)
    return Math.floor(Math.sqrt(x * x + y * y))
}