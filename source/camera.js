var Camera = function()
{
	this.reset = function()
	{
		l.camera.x = 0
		l.camera.y = 0

		return this
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

		return this
	}

	this.follow = function(a, b)
	{
		if (!a.deleted)
		{
			if (b && !b.deleted)
			{
				if (a.x < b.x)
				{
					var xFocus = (b.x - a.x) / 2 + a.x
				}
				else
				{
					var xFocus = (a.x - b.x) / 2 + b.x
				}

				if (a.y < b.y)
				{
					var yFocus = (b.y - a.y) / 2 + a.y
				}
				else
				{
					var yFocus = (a.y - b.y) / 2 + b.y
				}
			}
			else
			{
				var xFocus = a.x
				var yFocus = a.y
			}

			if (l.camera.state == 'resting')
			{
				if (l.camera.sandbox.width)
				{
					if (xFocus < l.camera.x + l.dom.width / 2 - l.camera.sandbox.width / 2)
					{
						l.camera.x = xFocus - l.dom.width / 2 + l.camera.sandbox.width / 2
					}
					else if (xFocus > l.camera.x + l.dom.width / 2 + l.camera.sandbox.width / 2)
					{
						l.camera.x = xFocus - l.dom.width / 2 - l.camera.sandbox.width / 2
					}
				}

				if (l.camera.sandbox.height)
				{
					if (yFocus < l.camera.y + l.dom.height / 2 - l.camera.sandbox.height / 2)
					{
						l.camera.y = yFocus - l.dom.height / 2 + l.camera.sandbox.height / 2
					}
					else if (yFocus > l.camera.y + l.dom.height / 2 + l.camera.sandbox.height / 2)
					{
						l.camera.y = yFocus - l.dom.height / 2 - l.camera.sandbox.height / 2
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
			}

			if (l.mouse)
			{
				l.mouse.calculate()
			}
		}

		return this
	}

	this.focusOn = function(a, b)
	{
		// Kinda redundant since this is a copy/paste of code above, but I'm too lazy to fix it right now
		if (b && !b.deleted)
		{
			if (a.x < b.x)
			{
				var xFocus = (b.x - a.x) / 2 + a.x
			}
			else
			{
				var xFocus = (a.x - b.x) / 2 + b.x
			}

			if (a.y < b.y)
			{
				var yFocus = (b.y - a.y) / 2 + a.y
			}
			else
			{
				var yFocus = (a.y - b.y) / 2 + b.y
			}
		}
		else
		{
			var xFocus = a.x
			var yFocus = a.y
		}

		l.camera.x = xFocus - l.dom.width / 2
		l.camera.y = yFocus - l.dom.height / 2

		if (l.mouse)
		{
			l.mouse.calculate()
		}

		return this
	}

	this.shake = function(shakes, severity, duration)
	{
		if (l.camera.state == 'resting')
		{
			l.camera.previous.x = l.camera.x
			l.camera.previous.y = l.camera.y
		}

		l.camera.state = 'shaking'
		
		var self = this

		var timing = duration / (shakes * 2)

		for (var i = 0; i < shakes * 2; i++)
		{
			self.milkshake(i, timing, severity)
		}

		return this
	}

		this.milkshake = function(i, timing, severity) // Tehe.  I'm so clever.
		{
			setTimeout(function()
			{
				l.camera.state = 'shaking'

				var min = 0 - severity / 2
				var max = severity / 2

				var xShake = Math.random() * (max - min) + min
				var yShake = Math.random() * (max - min) + min

				if (xShake > 0)
				{
					l.camera.x += xShake
				}
				else
				{
					l.camera.x -= Math.abs(xShake)
				}

				if (yShake > 0)
				{
					l.camera.y += yShake
				}
				else
				{
					l.camera.y -= Math.abs(yShake)
				}
			}, i * timing)

			setTimeout(function()
			{
				l.camera.state = 'resting'

				l.camera.x = l.camera.previous.x
				l.camera.y = l.camera.previous.y
			}, i * timing + timing / 2)
		}
}