l.entities = new Object() // The object that keeps track of our game objects

l.make = function(name, kind, x, y, sprite, width, height)
{
    l.entities[name] = new Object()
        l.entities[name].kind = kind
        l.entities[name].x = x
        l.entities[name].y = y
        l.entities[name].width = width
        l.entities[name].height = height
        l.entities[name].sprite = new Image()
            l.entities[name].sprite.src = sprite
}

l.move = new Object() // Create an object to organize the move functions into

l.move.snap = function(name, x, y)
{
    l.entities[name].x = x
    l.entities[name].y = y
}

l.move.toward = function(objectA, objectB, speed)
{
    var speedX = l.measure.x(objectA, objectB) / l.measure.total(objectA, objectB) * speed
    var speedY = l.measure.y(objectA, objectB) / l.measure.total(objectA, objectB) * speed
    
    if (l.measure.total(objectA, objectB) > 0)
    {
        if (l.entities[objectA].x + l.entities[objectA].width / 2 < l.entities[objectB].x + l.entities[objectB].width / 2)
        {
            l.move.right(objectA, speedX)
        }
        else
        {
            l.move.left(objectA, speedX)
        }
        
        if (l.entities[objectA].y + l.entities[objectA].height / 2 < l.entities[objectB].y + l.entities[objectB].height / 2)
        {
            l.move.down(objectA, speedY)
        }
        else
        {
            l.move.up(objectA, speedY)
        }
    }
}

l.move.up = function(name, speed)
{
    l.entities[name].y -= speed
}

l.move.down = function(name, speed)
{
    l.entities[name].y += speed
}

l.move.left = function(name, speed)
{
    l.entities[name].x -= speed
}

l.move.right = function(name, speed)
{
    l.entities[name].x += speed
}

l.measure = new Object() // Put the measurement functions into one object

l.measure.x = function(objectA, objectB)
{
    return Math.floor(Math.abs((l.entities[objectA].x + l.entities[objectA].width / 2) - (l.entities[objectB].x + l.entities[objectB].width / 2)))
}

l.measure.y = function(objectA, objectB)
{
    return Math.floor(Math.abs((l.entities[objectA].y + l.entities[objectA].height / 2) - (l.entities[objectB].y + l.entities[objectB].height / 2)))
}

l.measure.total = function(objectA, objectB)
{
    var x = l.measure.x(objectA, objectB)
    var y = l.measure.y(objectA, objectB)
    return Math.floor(Math.sqrt(x * x + y * y))
}

/*
function toward(objectA, objectB, moveSpeed) {
    if (objectA.length > 1) {
        for (var i = 0; i < objectA.length; i++) {
            
        }
    } else {
        var speedX = measure(objectA, objectB, 'x') / measure(objectA, objectB, 'total') * moveSpeed;
        var speedY = measure(objectA, objectB, 'y') / measure(objectA, objectB, 'total') * moveSpeed;
        
        if (measure(objectA, objectB, 'total') > 0) {
            if (objectA.x + objectA.w / 2 < objectB.x + objectB.w / 2) {
                move(objectA, 'right', speedX);
            } else {
                move(objectA, 'left', speedX);
            }
            
            if (objectA.y + objectA.h / 2 < objectB.y + objectB.h / 2) {
                move(objectA, 'down', speedY);
            } else {
                move(objectA, 'up', speedY);
            }
        }
    }
}
*/