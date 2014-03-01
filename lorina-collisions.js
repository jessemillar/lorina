l.collision = function(objectA, objectB, code)
{
	if (l.entities[objectB])
    {
	    if (l.entities[objectA].bounding.x < l.entities[objectB].bounding.x + l.entities[objectB].bounding.width && l.entities[objectA].bounding.x + l.entities[objectA].bounding.width > l.entities[objectB].bounding.x &&
	        l.entities[objectA].bounding.y < l.entities[objectB].bounding.y + l.entities[objectB].bounding.height && l.entities[objectA].bounding.y + l.entities[objectA].bounding.height > l.entities[objectB].bounding.y)
	    {
	    	if (code)
	    	{
	    		eval(code)
	    	}
	    	else
	    	{
	    		return true
	    	}
	    }
	    else
	    {
	    	return false
	    }
	}
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == objectB)
            {
                l.collision(objectA, thingy[i], code)
            }
        }
    }
}