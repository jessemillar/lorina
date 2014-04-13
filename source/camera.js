var Camera = function()
{
	l.camera = {x: 0, y: 0, sandbox: {width: 1, height: 1}}

	this.reset = function()
	{
		l.camera.x = 0
		l.camera.y = 0
	}

	this.setSandbox = function(width, height)
	{
		l.camera.sandbox.width = width
		l.camera.sandbox.height = height

		if (l.camera.sandbox.width <= 0)
		{
			l.camera.sandbox.width = 1
		}

		if (l.camera.sandbox.height <= 0)
		{
			l.camera.sandbox.height = 1
		}
	}

	this.follow = function(entity)
	{
		// if (this.state != 'shaking')
		// {
			if (l.camera.sandbox.width)
			{
				if (entity.x < l.camera.x + l.dom.width / 2 - l.camera.sandbox.width / 2)
				{
					l.camera.x = entity.x - l.dom.width / 2 + l.camera.sandbox.width / 2
				}
				else if (entity.x > l.camera.x + l.dom.width / 2 + l.camera.sandbox.width / 2)
				{
					l.camera.x = entity.x - l.dom.width / 2 - l.camera.sandbox.width / 2
				}
			}

			if (l.camera.sandbox.height)
			{
				if (entity.y < l.camera.y + l.dom.height / 2 - l.camera.sandbox.height / 2)
				{
					l.camera.y = entity.y - l.dom.height / 2 + l.camera.sandbox.height / 2
				}
				else if (entity.y > l.camera.y + l.dom.height / 2 + l.camera.sandbox.height / 2)
				{
					l.camera.y = entity.y - l.dom.height / 2 - l.camera.sandbox.height / 2
				}
			}

			if (l.camera.x < 0)
			{
				l.camera.x = 0
			}
			else if (l.camera.x > l.room.width - l.dom.width)
			{
				l.camera.x = l.room.width - l.dom.width
			}

			if (l.camera.y < 0)
			{
				l.camera.y = 0
			}
			else if (l.camera.y > l.room.height - l.dom.height)
			{
				l.camera.y = l.room.height - l.dom.height
			}
		// }
	}

	/*
	this.shake = function(shakes, duration, severity)
	{
		this.state = true // Tell the "following" function that we're shaking
		
		// "Back up" the camera's position
		this.previous.x = l.camera.x
		this.previous.y = l.camera.y
		
		var timing = duration / (shakes * 2)
		
		for (var i = 0; i < shakes * 2; i++)
		{
			if (i % 2 == 0)
			{
				setTimeout(function() // Set the timeout that will reset the camera back to its proper position
				{
					l.camera.x = this.previous.x
					l.camera.y = this.previous.y
				}, timing * i)
			}
			else
			{
				setTimeout(function()
				{
					var xMovement = l.tools.random(0 - severity / 2, severity / 2)
					var yMovement = l.tools.random(0 - severity / 2, severity / 2)

					if (xMovement > 0)
					{
						if (l.camera.x + xMovement < l.dom.width - l.dom.width)
						{
							l.camera.x += xMovement
						}
					}
					else
					{
						if (l.camera.x - Math.abs(xMovement) > 0)
						{
							l.camera.x = l.camera.x - Math.abs(xMovement)
						}
					}

					if (yMovement > 0)
					{
						if (l.camera.y + yMovement < l.dom.height - l.dom.height)
						{
							l.camera.y += yMovement
						}
					}
					else
					{
						if (l.camera.y - Math.abs(yMovement) > 0)
						{
							l.camera.y -= Math.abs(yMovement)
						}
					}
				}, timing * i)
			}
		}
		
		setTimeout(function()
		{
			this.state = 'resting' // Tell the world that we're done shaking
		}, duration)
	}
	*/
}