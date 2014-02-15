l.entities = new Array() // The array that keeps track of our game objects

l.make = function(name, kind, x, y, sprite, width, height)
{
    var thingy = new Object()
        thingy.name = name
        thingy.kind = kind
        thingy.x = x
        thingy.y = y
        thingy.width = width
        thingy.height = height
        thingy.sprite = new Image()
            thingy.sprite.src = sprite
    l.entities.push(thingy)
}

l.move = new Object()

l.move.snap = function(name, x, y)
{
    for (var i = 0; i < l.entities.length; i++)
    {
        if (l.entities[i].name == name)
        {
            l.entities[i].x = x
            l.entities[i].y = y
            break
        }
    }
}

l.move.up = function(name, speed)
{
    for (var i = 0; i < l.entities.length; i++)
    {
        if (l.entities[i].name == name)
        {
            l.entities[i].y -= speed
            break
        }
    }
}

l.move.down = function(name, speed)
{
    for (var i = 0; i < l.entities.length; i++)
    {
        if (l.entities[i].name == name)
        {
            l.entities[i].y += speed
            break
        }
    }
}

l.move.left = function(name, speed)
{
    for (var i = 0; i < l.entities.length; i++)
    {
        if (l.entities[i].name == name)
        {
            l.entities[i].x -= speed
            break
        }
    }
}

l.move.right = function(name, speed)
{
    for (var i = 0; i < l.entities.length; i++)
    {
        if (l.entities[i].name == name)
        {
            l.entities[i].x += speed
            break
        }
    }
}

/*
function measure(objectA, objectB, desiredMeasure) {
    var distanceX = Math.floor(Math.abs((objectA.x + objectA.w / 2) - (objectB.x + objectB.w / 2)));
    var distanceY = Math.floor(Math.abs((objectA.y + objectA.h / 2) - (objectB.y + objectB.h / 2)));
    var distanceTotal = Math.floor(Math.sqrt(distanceX * distanceX + distanceY * distanceY));
    
    if (desiredMeasure == 'total' || desiredMeasure == 't') {
        if (isNaN(distanceTotal)) {
            return 0;
        } else {
            return distanceTotal;
        }
    } else if (desiredMeasure == 'x') {
        if (isNaN(distanceX)) {
            return 0;
        } else {
            return distanceX;
        }
    } else if (desiredMeasure == 'y') {
        if (isNaN(distanceY)) {
            return 0;
        } else {
            return distanceY;
        }
    }
}

function toward(objectA, objectB, moveSpeed) {
    if (objectA.length > 1) {
        for (var i = 0; i < objectA.length; i++) {
            var speedX = measure(objectA[i], objectB, 'x') / measure(objectA[i], objectB, 'total') * moveSpeed;
            var speedY = measure(objectA[i], objectB, 'y') / measure(objectA[i], objectB, 'total') * moveSpeed;
            
            if (measure(objectA[i], objectB, 'total') > 0) {
                if (objectA[i].x + objectA[i].w / 2 < objectB.x + objectB.w / 2) {
                    move(objectA[i], 'right', speedX);
                } else {
                    move(objectA[i], 'left', speedX);
                }
                
                if (objectA[i].y + objectA[i].h / 2 < objectB.y + objectB.h / 2) {
                    move(objectA[i], 'down', speedY);
                } else {
                    move(objectA[i], 'up', speedY);
                }
            }
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