l.tool = new Object() // Group the tool functions

l.tool.random = function(min, max)
{
    return Math.random() * (max - min) + min
}

l.tool.count = new Object() // Group the counting functions

l.tool.count.all = function()
{
    var count = 0
    
    for (var i in l.entities)
    {
        count++
    }
    
    return count
}

l.tool.count.prototype = function(name) // We give objects created from prototypes a special "category" that allows us to use this function to search for them even if they're not categorized (used for the engine)
{
    var count = 0
	
    for (var i in l.entities)
    {
        if (l.entities[i].prototype == name)
        {
            count++
        }
    }
	
    return count
}

l.tool.count.category = function(name)
{
    var count = 0
	
	for (var i in l.entities)
	{
		if (l.entities[i].category == name)
		{
            count++
        }
    }
	
    return count
}

l.tool.measure = new Object() // Put the measurement functions into one object

l.tool.measure.x = function(a, b)
{
    if (l.entities[a] && l.entities[b])
    {
        return Math.floor(Math.abs(l.entities[a].anchor.x - l.entities[b].anchor.x))
    }
    else
    {
        return Math.floor(Math.abs(l.entities[a].anchor.x - b))
    }
}

l.tool.measure.y = function(a, b)
{
    if (l.entities[a] && l.entities[b])
    {
        return Math.floor(Math.abs(l.entities[a].anchor.y - l.entities[b].anchor.y))
    }
    else
    {
        return Math.floor(Math.abs(l.entities[a].anchor.y - b))
    }
}

l.tool.measure.total = function(a, b, q) // b and q double as x and y
{
    if (l.entities[a] && l.entities[b])
    {
        var horizontal = l.tool.measure.x(a, b)
        var vertical = l.tool.measure.y(a, b)
        return Math.floor(Math.sqrt(horizontal * horizontal + vertical * vertical))
    }
    else
    {
        var horizontal = l.tool.measure.x(a, b)
        var vertical = l.tool.measure.y(a, q)
        return Math.floor(Math.sqrt(horizontal * horizontal + vertical * vertical))
    }
}

l.tool.convert = new Object()

l.tool.convert.radian = function(number)
{
	return number * 180 / Math.PI
}

l.tool.convert.degree = function(number)
{
	return number * Math.PI / 180
}