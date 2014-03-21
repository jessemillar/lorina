l.camera = new Object() // Group the camera functions

l.camera.follow = function(name, sandboxWidth, sandboxHeight)
{
    if (!l.entities.camera.shaking)
    {
        l.entities.camera.following = true // Tell the world that we're following something with the camera
		
        if (sandboxWidth)
        {
            if (l.entities[name].anchor.x < l.entities.camera.x + l.entities.camera.width / 2 - sandboxWidth / 2)
            {
                l.entities.camera.x = Math.round(l.entities[name].anchor.x - l.entities.camera.width / 2 + sandboxWidth / 2)
            }
            else if (l.entities[name].anchor.x > l.entities.camera.x + l.entities.camera.width / 2 + sandboxWidth / 2)
            {
                l.entities.camera.x = Math.round(l.entities[name].anchor.x - l.entities.camera.width / 2 - sandboxWidth / 2)
            }
        }
		
        if (sandboxHeight)
        {
            if (l.entities[name].anchor.y < l.entities.camera.y + l.entities.camera.height / 2 - sandboxHeight / 2)
            {
                l.entities.camera.y = Math.round(l.entities[name].anchor.y - l.entities.camera.height / 2 + sandboxHeight / 2)
            }
            else if (l.entities[name].anchor.y > l.entities.camera.y + l.entities.camera.height / 2 + sandboxHeight / 2)
            {
                l.entities.camera.y = Math.round(l.entities[name].anchor.y - l.entities.camera.height / 2 - sandboxHeight / 2)
            }
        }
		
        if (l.entities.camera.x < 0)
        {
            l.entities.camera.x = 0
        }
        else if (l.entities.camera.x > l.canvas.width - l.entities.camera.width)
        {
            l.entities.camera.x = l.canvas.width - l.entities.camera.width
        }
		
        if (l.entities.camera.y < 0)
        {
            l.entities.camera.y = 0
        }
        else if (l.entities.camera.y > l.canvas.height - l.entities.camera.height)
        {
            l.entities.camera.y = l.canvas.height - l.entities.camera.height
        }
    }
}

l.camera.reset = function()
{
    l.entities.camera.x = 0
    l.entities.camera.y = 0
}

l.camera.shake = function(shakes, duration, severity)
{
    if (l.entities.camera.following)
    {
        l.entities.camera.shaking = true // Tell the "following" function that we're shaking
    }
	
    // "Back up" the camera's position
    l.entities.camera.previous.x = l.entities.camera.x
    l.entities.camera.previous.y = l.entities.camera.y
	
    var timing = duration / (shakes * 2)
	
    for (var i = 0; i < shakes * 2; i++)
    {
        if (i % 2 == 0)
        {
            setTimeout(function() // Set the timeout that will reset the camera back to its proper position
					   {
					   l.entities.camera.x = l.entities.camera.previous.x
					   l.entities.camera.y = l.entities.camera.previous.y
					   }, timing * i)
        }
        else
        {
            setTimeout(function()
					   {
					   var xMovement = Math.round(l.tools.random(0 - severity / 2, severity / 2))
					   var yMovement = Math.round(l.tools.random(0 - severity / 2, severity / 2))
					   
					   if (xMovement > 0)
					   {
					   if (l.entities.camera.x + xMovement < l.canvas.width - l.entities.camera.width)
					   {
					   l.entities.camera.x += xMovement
					   }
					   }
					   else
					   {
					   if (l.entities.camera.x - Math.abs(xMovement) > 0)
					   {
					   l.entities.camera.x = l.entities.camera.x - Math.abs(xMovement)
					   }
					   }
					   
					   if (yMovement > 0)
					   {
					   if (l.entities.camera.y + yMovement < l.canvas.height - l.entities.camera.height)
					   {
					   l.entities.camera.y += yMovement
					   }
					   }
					   else
					   {
					   if (l.entities.camera.y - Math.abs(yMovement) > 0)
					   {
					   l.entities.camera.y -= Math.abs(yMovement)
					   }
					   }
					   }, timing * i)
        }
    }
	
    setTimeout(function()
			   {
			   if (l.entities.camera.following)
			   {
			   l.entities.camera.shaking = false // Tell the following function that we're done shaking
			   }
			   }, duration)
}