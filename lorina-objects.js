l.entities = new Object() // The object that keeps track of our game objects

l.object = new Object() // Group the object functions

l.object.make = function(name, kind, x, y, sprite, width, height)
{
    l.entities[name] = new Object()
        l.entities[name].kind = kind
        l.entities[name].x = x
        l.entities[name].y = y
        l.entities[name].width = width
        l.entities[name].height = height
        l.entities[name].center = new Object()
            l.entities[name].center.x = x + width / 2
            l.entities[name].center.y = y + height / 2
        l.entities[name].sprite = new Image()
            l.entities[name].sprite.src = sprite
}

l.object.update = function(name) // Update "hidden" values that relate to the position of the object
{
    l.entities[name].center.x = l.entities[name].x + l.entities[name].width / 2
    l.entities[name].center.y = l.entities[name].y + l.entities[name].height / 2
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
    l.entities[name].y -= (speed / 60)
    l.object.update(name)
}

l.move.down = function(name, speed)
{
    l.entities[name].y += (speed / 60)
    l.object.update(name)
}

l.move.left = function(name, speed)
{
    l.entities[name].x -= (speed / 60)
    l.object.update(name)
}

l.move.right = function(name, speed)
{
    l.entities[name].x += (speed / 60)
    l.object.update(name)
}

l.move.toward = function(objectA, objectB, speed)
{
    var speedX = l.measure.x(objectA, objectB) / l.measure.total(objectA, objectB) * speed
    var speedY = l.measure.y(objectA, objectB) / l.measure.total(objectA, objectB) * speed
    
    if (l.measure.total(objectA, objectB) > 0)
    {
        if (l.entities[objectA].center.y > l.entities[objectB].center.y)
        {
            l.move.up(objectA, speedY)
        }
        else
        {
            l.move.down(objectA, speedY)
        }

        if (l.entities[objectA].center.x > l.entities[objectB].center.x)
        {
            l.move.left(objectA, speedX)
        }
        else
        {
            l.move.right(objectA, speedX)
        }
    }
}

l.measure = new Object() // Put the measurement functions into one object

l.measure.x = function(objectA, objectB)
{
    return Math.floor(Math.abs(l.entities[objectA].center.x - l.entities[objectB].center.x))
}

l.measure.y = function(objectA, objectB)
{
    return Math.floor(Math.abs(l.entities[objectA].center.y - l.entities[objectB].center.y))
}

l.measure.total = function(objectA, objectB)
{
    var x = l.measure.x(objectA, objectB)
    var y = l.measure.y(objectA, objectB)
    return Math.floor(Math.sqrt(x * x + y * y))
}