l.entities = new Object() // The object that keeps track of our game objects

l.object = new Object() // Group the object functions

l.object.make = function(name, x, y, sprite, width, height, anchorX, anchorY)
{
    l.entities[name] = new Object()
        l.entities[name].x = x
        l.entities[name].y = y
        if (width && height) // Do some stuff if the object we're trying to create is more than just a point
        {
            l.entities[name].width = width
            l.entities[name].height = height
            l.entities[name].anchor = new Object()
                l.entities[name].anchor.offset = new Object()
            if (anchorX >= 0 && anchorY >= 0) // If we supply an anchor point (including 0, 0), tell the engine
            {
                    l.entities[name].anchor.offset.x = anchorX
                    l.entities[name].anchor.offset.y = anchorY
                l.entities[name].anchor.x = x + anchorX
                l.entities[name].anchor.y = y + anchorY
            }
            else // ...or set the anchor to the center of the image
            {
                    l.entities[name].anchor.offset.x = width / 2
                    l.entities[name].anchor.offset.y = height / 2
                l.entities[name].anchor.x = x + width / 2
                l.entities[name].anchor.y = y + height / 2
            }
        }
        else // ...or make an object that's just a point in space
        {
            l.entities[name].width = 0
            l.entities[name].height = 0
            l.entities[name].anchor = new Object()
                l.entities[name].anchor.offset = new Object()
                    l.entities[name].anchor.offset.x = 0
                    l.entities[name].anchor.offset.y = 0
                l.entities[name].anchor.x = x
                l.entities[name].anchor.y = y
        }
        if (sprite)
        {
            l.entities[name].sprite = new Image()
                l.entities[name].sprite.src = sprite
        }
}

l.object.update = function(name) // Update "hidden" values that relate to the position of the object
{
    // Shift the anchor point (whether manually supplied or automatically centered) to reflec the object's new position
    l.entities[name].anchor.x = l.entities[name].x + l.entities[name].anchor.offset.x
    l.entities[name].anchor.y = l.entities[name].y + l.entities[name].anchor.offset.y
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