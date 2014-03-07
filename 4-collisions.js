l.collision = function(a, b, code)
{
	if (l.entities[a] && l.entities[b])
    {
        if (l.entities[a].bounding.x < l.entities[b].bounding.x + l.entities[b].bounding.width && l.entities[a].bounding.x + l.entities[a].bounding.width > l.entities[b].bounding.x)
        {
            if (l.entities[a].bounding.y < l.entities[b].bounding.y + l.entities[b].bounding.height && l.entities[a].bounding.y + l.entities[a].bounding.height > l.entities[b].bounding.y)
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
            return false
        }
	}
    else
    {
    	if (l.entities[a])
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
    	else if (l.entities[b])
    	{
    		var thingy = Object.keys(l.entities)

    		for (var i = 0; i < thingy.length; i++)
    		{
    			if (l.entities[thingy[i]].category == b)
        		{
    				l.collision(thingy[i], b, code)
    			}
    		}
    	}
    	else
    	{
            var thingy = Object.keys(l.entities)

            for (var i = 0; i < l.tool.count.category(a); i++)
            {
                for (var j = 0; j < thingy.length; j++)
                {
                    if (l.entities[thingy[j]].category == a)
                    {
                        for (var k = 0; k < thingy.length; k++)
                        {
                            if (l.entities[thingy[k]].category == b)
                            {
                                l.collision(thingy[j], thingy[k], code)
                                thingy = Object.keys(l.entities) // Reupdate the "database" to prevent calculations regarding deleted objects
                            }
                        }
                    }
                }
            }
    	}
    }
}