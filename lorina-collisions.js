l.collision = new Object() // Group the collision functions

l.collision.overlap = function(objectA, objectB)
{
    if (l.entities[objectA].bounding.x < l.entities[objectB].bounding.x + l.entities[objectB].bounding.width && l.entities[objectA].bounding.x + l.entities[objectA].bounding.width > l.entities[objectB].bounding.x &&
        l.entities[objectA].bounding.y < l.entities[objectB].bounding.y + l.entities[objectB].bounding.height && l.entities[objectA].bounding.y + l.entities[objectA].bounding.height > l.entities[objectB].bounding.y)
    {
        return true
    }
    else
    {
        return false
    }
}