l.collision = function(a, b, code)
{
	if (l.entities[b])
    {
	    if (l.entities[a].bounding.x < l.entities[b].bounding.x + l.entities[b].bounding.width && l.entities[a].bounding.x + l.entities[a].bounding.width > l.entities[b].bounding.x &&
	        l.entities[a].bounding.y < l.entities[b].bounding.y + l.entities[b].bounding.height && l.entities[a].bounding.y + l.entities[a].bounding.height > l.entities[b].bounding.y)
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
            if (l.entities[thingy[i]].category == b)
            {
                l.collision(a, thingy[i], code)
            }
        }
    }
}