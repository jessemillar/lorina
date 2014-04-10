var Typewriter = function()
{
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
		if (this.font && this.size)
		{
			l.ctx.font = this.size + 'px ' + this.font
		}
		else if (this.font)
		{
			l.ctx.font = '10px ' + this.font
		}
		else if (this.size)
		{
			l.ctx.font = this.size + 'px sans-serif'
		}
		else
		{
			l.ctx.font = '10px sans-serif'
		}

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

		if (this.textMode == 'hud')
		{
			l.ctx.fillText(string, this.x, this.y)
		}
		else
		{
			l.ctx.fillText(string, this.x - l.camera.x, this.y - l.camera.y)
		}

		return this
	}
}