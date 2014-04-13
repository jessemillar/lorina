var Typewriter = function()
{
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

	this.setColor = function(color)
	{
		this.color = color

		return this
	}

	this.setTextMode = function(mode)
	{
		this.textMode = mode

		return this
	}

	this.setPosition = function(x, y)
	{
		this.x = x
		this.y = y

		return this
	}

	this.writeText = function(string)
	{
		if (this.style)
		{
			var style = this.style
		}
		else
		{
			var style = ''
		}

		if (this.size)
		{
			var size = this.size
		}
		else
		{
			var size = ''
		}

		if (this.font)
		{
			var font = this.font
		}
		else
		{
			var font = ''
		}


		l.ctx.font = style + ' ' +  size + 'px ' + font


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

		if (this.size)
		{
			this.y += this.size
		}
		else
		{
			this.y += 10
		}

		if (this.opacity)
		{
			l.ctx.globalAlpha = this.opacity
		}

		if (this.textMode == 'hud')
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
}