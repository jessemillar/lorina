l.text = new Object() // Group the text-related function

l.text.write = function(string, x, y, color)
{
	if (color)
	{
		l.ctx.fillStyle = color
	}
	else
	{
		l.ctx.fillStyle = '#000000'
	}
    l.ctx.fillText(string, x - l.camera.x, y - l.camera.y)
}