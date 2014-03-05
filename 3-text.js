l.text = new Object() // Group the text-related function

l.text.write = function(string, x, y, color, type)
{
	if (color)
	{
		l.ctx.fillStyle = color
	}
	else
	{
		l.ctx.fillStyle = '#000000'
	}

	if (type == 'hud')
	{
		l.ctx.fillText(string, x, y)
	}
	else
	{
		l.ctx.fillText(string, x - l.entities.camera.x, y - l.entities.camera.y)
	}
}