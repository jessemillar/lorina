l.write = new Object() // Group the text-related function

l.write.hud = function(string, x, y, font, size, color, alignment)
{
	if (font)
	{
		l.ctx.font = (size + 'px ' + font).toString()
	}
	else
	{
		l.ctx.font = '10px sans-serif'
	}

	if (color)
	{
		l.ctx.fillStyle = color
	}
	else
	{
		l.ctx.fillStyle = '#000000'
	}

	if (alignment)
	{
		if (alignment == 'left')
		{
			l.ctx.textAlign = 'left'
		}
		else if (alignment == 'right')
		{
			l.ctx.textAlign = 'right'
		}
		else if (alignment == 'center')
		{
			l.ctx.textAlign = 'center'
		}
	}
	else
	{
		l.ctx.textAlign = 'left'
	}

	if (size)
	{
		l.ctx.fillText(string, x, y + size)
	}
	else
	{
		l.ctx.fillText(string, x, y + 10)
	}
}

l.write.text = function(string, x, y, font, size, color, alignment)
{
	if (font)
	{
		l.ctx.font = (size + 'px ' + font).toString()
	}
	else
	{
		l.ctx.font = '10px sans-serif'
	}

	if (color)
	{
		l.ctx.fillStyle = color
	}
	else
	{
		l.ctx.fillStyle = '#000000'
	}

	if (alignment)
	{
		if (alignment == 'left')
		{
			l.ctx.textAlign = 'left'
		}
		else if (alignment == 'right')
		{
			l.ctx.textAlign = 'right'
		}
		else if (alignment == 'center')
		{
			l.ctx.textAlign = 'center'
		}
	}
	else
	{
		l.ctx.textAlign = 'left'
	}

	if (size)
	{
		l.ctx.fillText(string, x - l.entities.camera.x, y + size - l.entities.camera.y)
	}
	else
	{
		l.ctx.fillText(string, x - l.entities.camera.x, y + 10 - l.entities.camera.y)
	}
}