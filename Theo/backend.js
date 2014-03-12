t = new Object() // Group everything here

t.setup = function(color, grid, opacity, width, height)
{
	t.color = color
	t.grid = new Object()
		t.grid.width = width
		t.grid.height = height
		t.grid.color = grid
		t.grid.opacity = opacity / 100

	document.body.style.background = t.color

	t.dom = document.getElementById('canvas')
    t.ctx = document.getElementById('canvas').getContext('2d')

    t.dom.width = window.innerWidth
    t.dom.height = window.innerHeight - 50
}

t.start = function()
{
	t.loop = setInterval(main, 1000 / 60)
}

t.draw = new Object() // Group the draw functions

t.draw.clear = function()
{
	t.ctx.fillStyle = '#' + t.color
	t.ctx.fillRect(0, 0, t.dom.width, t.dom.height)
}

t.draw.grid = function()
{
	for (var i = 0; i < t.dom.width / t.grid.width; i++)
	{
		t.ctx.beginPath()
		t.ctx.moveTo(Math.round(i * t.grid.width) + 0.5, 0 + 0.5)
		t.ctx.lineTo(Math.round(i * t.grid.width) + 0.5, Math.round(t.dom.height) + 0.5)
		t.ctx.lineWidth = 1
		t.ctx.strokeStyle = '#' + t.grid.color
		t.ctx.globalAlpha = t.grid.opacity
		t.ctx.stroke()
	}

	for (var i = 0; i < t.dom.height / t.grid.height; i++)
	{
		t.ctx.beginPath()
		t.ctx.moveTo(0 + 0.5, Math.round(i * t.grid.height) + 0.5)
		t.ctx.lineTo(Math.round(t.dom.width) + 0.5, Math.round(i * t.grid.height) + 0.5)
		t.ctx.lineWidth = 1
		t.ctx.strokeStyle = '#' + t.grid.color
		t.ctx.globalAlpha = t.grid.opacity
		t.ctx.stroke()
	}
}