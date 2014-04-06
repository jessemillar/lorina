// Probably doesn't work currently

var Camera = function()
{
	this.follow = function(entity, sandboxWidth, sandboxHeight)
	{
		if (!this.shaking)
		{
			this.following = true // Tell the world that we're following something with the camera

			if (sandboxWidth)
			{
				if (entity.anchor.x < this.x + this.width / 2 - sandboxWidth / 2)
				{
					this.x = Math.round(entity.anchor.x - this.width / 2 + sandboxWidth / 2)
				}
				else if (entity.anchor.x > this.x + this.width / 2 + sandboxWidth / 2)
				{
					this.x = Math.round(entity.anchor.x - this.width / 2 - sandboxWidth / 2)
				}
			}

			if (sandboxHeight)
			{
				if (entity.anchor.y < this.y + this.height / 2 - sandboxHeight / 2)
				{
					this.y = Math.round(entity.anchor.y - this.height / 2 + sandboxHeight / 2)
				}
				else if (entity.anchor.y > this.y + this.height / 2 + sandboxHeight / 2)
				{
					this.y = Math.round(entity.anchor.y - this.height / 2 - sandboxHeight / 2)
				}
			}

			if (this.x < 0)
			{
				this.x = 0
			}
			else if (this.x > l.dom.width - this.width)
			{
				this.x = l.dom.width - this.width
			}

			if (this.y < 0)
			{
				this.y = 0
			}
			else if (this.y > l.dom.height - this.height)
			{
				this.y = l.dom.height - this.height
			}
		}
	}

	this.reset = function()
	{
		this.x = 0
		this.y = 0
	}

	this.shake = function(shakes, duration, severity)
	{
		if (this.following)
		{
			this.shaking = true // Tell the "following" function that we're shaking
		}
		
		// "Back up" the camera's position
		this.previous.x = this.x
		this.previous.y = this.y
		
		var timing = duration / (shakes * 2)
		
		for (var i = 0; i < shakes * 2; i++)
		{
			if (i % 2 == 0)
			{
				setTimeout(function() // Set the timeout that will reset the camera back to its proper position
				{
					this.x = this.previous.x
					this.y = this.previous.y
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
						if (this.x + xMovement < l.dom.width - this.width)
						{
							this.x += xMovement
						}
					}
					else
					{
						if (this.x - Math.abs(xMovement) > 0)
						{
							this.x = this.x - Math.abs(xMovement)
						}
					}

					if (yMovement > 0)
					{
						if (this.y + yMovement < l.dom.height - this.height)
						{
							this.y += yMovement
						}
					}
					else
					{
						if (this.y - Math.abs(yMovement) > 0)
						{
							this.y -= Math.abs(yMovement)
						}
					}
				}, timing * i)
			}
		}
		
		setTimeout(function()
		{
			if (this.following)
			{
				this.shaking = false // Tell the following function that we're done shaking
			}
		}, duration)
	}
}