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
}

l.object.sprite = function(name, sprite, width, height, count, timer)
{
    if (!count) // Make it okay to have an image that doesn't animate
    {
        count = 1
    }

    l.preloader.queue()
    l.entities[name].sprite = new Image()
        l.entities[name].sprite.src = sprite
        l.entities[name].animate = new Object() // Group the non-src-related properties
            l.entities[name].animate.width = width
            l.entities[name].animate.height = height
            l.entities[name].animate.count = count
            l.entities[name].animate.frame = 0
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
    l.entities[name].x = x
    l.entities[name].y = y
    l.object.update(name)
}

l.move.up = function(name, speed)
{
    l.entities[name].y -= speed / 60
    l.object.update(name)
}

l.move.down = function(name, speed)
{
    l.entities[name].y += speed / 60
    l.object.update(name)
}

l.move.left = function(name, speed)
{
    l.entities[name].x -= speed / 60
    l.object.update(name)
}

l.move.right = function(name, speed)
{
    l.entities[name].x += speed / 60
    l.object.update(name)
}

l.move.toward = function(objectA, objectB, speed)
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