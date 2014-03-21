l.collision = function(a, b, code)
{
	if (l.entities[a] && l.entities[b]) // Check a for collisions with b
    {
        if (l.entities[a].bounding.x < l.entities[b].bounding.x + l.entities[b].bounding.width && l.entities[a].bounding.x + l.entities[a].bounding.width > l.entities[b].bounding.x && l.entities[a].bounding.y < l.entities[b].bounding.y + l.entities[b].bounding.height && l.entities[a].bounding.y + l.entities[a].bounding.height > l.entities[b].bounding.y)
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
    	if (l.entities[a])
    	{
    		for (var i in l.entities)
    		{
    			if (l.entities[i].category == b)
        		{
    				l.collision(a, i, code)
    			}
    		}
    	}
    	else if (l.entities[b])
    	{
    		for (var i in l.entities)
    		{
    			if (l.entities[i].category == a)
        		{
    				l.collision(i, b, code)
    			}
    		}
    	}
    	else
    	{
            for (var i in l.entities)
            {
                if (l.entities[i].category == a)
                {
                    for (var j in l.entities)
                    {
                        if (l.entities[j].category == b)
                        {
                            l.collision(i, j, code)
                        }
                    }
                }
            }
    	}
    }
}