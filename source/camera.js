var Camera = function()
{
	l.camera = {state: 'resting', x: 0, y: 0, previous: {x: 0, y: 0}, sandbox: {width: 1, height: 1}}

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
		if (l.camera.state == 'resting')
		{
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
		}

		l.mouse.calculate()
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