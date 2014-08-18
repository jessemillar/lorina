var Typewriter = function()
{
	this.reset = function()
	{
		this.alignment = undefined
		this.baseline = undefined
		this.opacity = undefined
		this.style = undefined
		this.font = undefined
		this.size = undefined
		this.color = undefined
		this.textMode = undefined

		return this
	}

	this.setOpacity = function(opacity)
	{
		this.opacity = opacity

		return this
	}

	this.setStyle = function(style)
	{
		this.style = style

		return this
	}

	this.setFont = function(font)
	{
		this.font = font

		return this
	}

	this.setSize = function(size)
	{
		this.size = size

		return this
	}

	this.setAlignment = function(alignment)
	{
		this.alignment = alignment

		return this
	}

	this.setBaseline = function(baseline)
	{
		this.baseline = baseline

		return this
	}

	this.setColor = function(color)
	{
		this.color = color

		return this
	}

	this.setPosition = function(x, y)
	{
		this.x = x
		this.y = y

		return this
	}

	this.write = function(string, hud)
	{
		if (this.style)
		{
			var style = this.style
		}
		else
		{
			var style = ''
		}

		if (this.font)
		{
			var font = this.font
		}
		else
		{
			var font = 'sans-serif'
		}

		l.ctx.font = style + ' ' + this.size + 'px ' + font

		if (this.color)
		{
			l.ctx.fillStyle = this.color
		}
		else
		{
			l.ctx.fillStyle = '#000000'
		}

		if (this.alignment)
		{
			l.ctx.textAlign = this.alignment
		}
		else
		{
			l.ctx.textAlign = 'left'
		}

		if (this.baseline == 'top')
		{
			l.ctx.textBaseline = 'hanging'
		}
		else if (this.baseline == 'middle')
		{
			l.ctx.textBaseline = 'middle'
		}
		else if (this.baseline == 'bottom')
		{
			l.ctx.textBaseline = 'alphabetic'
		}
		else
		{
			l.ctx.textBaseline = 'hanging'
		}

		if (this.opacity)
		{
			l.ctx.globalAlpha = this.opacity
			this.opacity = 1
		}

		if (hud)
		{
			l.ctx.fillText(string, this.x, this.y)
		}
		else
		{
			l.ctx.fillText(string, this.x - l.camera.x, this.y - l.camera.y)
		}

		l.ctx.globalAlpha = 1

		return this
	}

	var typingStringLoaded = false
	var typingPosition = 0
	var stringToType = ''

	this.type = function(string, timing)
	{
		if (!typingStringLoaded)
		{
			this.key(string, timing)
			typingStringLoaded = true
		}

		this.write(string.substr(0, typingPosition))

		return this
	}

		this.key = function(string, timing)
		{
			for (var i = 0; i < string.length; i++)
			{
				setTimeout(function()
				{
					typingPosition++
				}, timing * i)
			}
		}

	this.pulse = function(amount, duration)
	{
		
		
		return this
	}
}