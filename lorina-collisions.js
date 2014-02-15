l.collision = new Object() // Group the collision functions

l.collision.overlap = function(objectA, objectB)
{
    if (l.entities[objectA].x < l.entities[objectB].x + l.entities[objectB].width && l.entities[objectA].x + l.entities[objectA].width > l.entities[objectB].x &&
        l.entities[objectA].y < l.entities[objectB].y + l.entities[objectB].height && l.entities[objectA].y + l.entities[objectA].height > l.entities[objectB].y)
    {
        return true
    }
    else
    {
        return false
    }
}