t = new Object() // Group everything here

t.grid = new Object()
t.grid.x = new Array() // Put x coordinates here
t.grid.y = new Array() // Put y coordinates here

t.database = new Object()

t.setup = function(tileWidth, tileHeight, width, height, backgroundColor, gridColor, gridOpacity)
{
	t.dom = document.getElementById('canvas')
    t.ctx = document.getElementById('canvas').getContext('2d')

    document.onmousemove = t.mouse.moved
	t.dom.setAttribute('onmousedown', 't.mouse.click(event)')
	t.dom.setAttribute('onmouseup', 't.mouse.cancel()')
	document.body.setAttribute('onkeydown', 't.keyboard.pressed(event)')
    document.body.setAttribute('onkeyup', 't.keyboard.cancel(event)')

    document.body.setAttribute('onresize', 't.calculate.canvas()')

	t.color = backgroundColor
	t.grid = new Object()
		t.grid.width = width
		t.grid.height = height
		t.grid.tile = new Object()
			t.grid.tile.width = tileWidth
			t.grid.tile.height = tileHeight
		t.grid.color = gridColor
		t.grid.opacity = gridOpacity / 100

	t.calculate.canvas()
}

t.start = function()
{
	t.loop = setInterval(main, 1000 / 60)
}

t.mouse = new Object()
t.mouse.click = new Object()

t.mouse.click = function()
{
	t.mouse.clicked = true
}

t.mouse.cancel = function()
{
	t.mouse.clicked = false
}

t.mouse.moved = function(event)
{
    if (event)
    {
    	t.mouse.x = event.clientX - t.dom.offsetLeft + document.body.scrollLeft
    	t.mouse.y = event.clientY - t.dom.offsetTop + document.body.scrollTop
    }
}

t.mouse.inside = function()
{
	if (t.mouse.x > 0 && t.mouse.x < t.dom.offsetLeft + t.dom.offsetWidth && t.mouse.y > 0 && t.mouse.y < t.dom.offsetTop + t.dom.offsetHeight)
	{
		return true
	}
	else
	{
		return false
	}
}

t.keyboard = new Object()

t.keyboard.pressed = function(event)
{
    if (event.keyCode == 32)
    {
        t.keyboard.space = true
    }

    if (event.keyCode == 49)
    {
        t.keyboard.one = true
    }

    if (event.keyCode == 50)
    {
        t.keyboard.two = true
    }

    if (event.keyCode == 51)
    {
        t.keyboard.three = true
    }
}

t.keyboard.cancel = function(event)
{
    if (event.keyCode == 32)
    {
        t.keyboard.space = false
    }

    if (event.keyCode == 49)
    {
        t.keyboard.one = false
    }

    if (event.keyCode == 50)
    {
        t.keyboard.two = false
    }

    if (event.keyCode == 51)
    {
        t.keyboard.three = false
    }
}

t.calculate = new Object() // Group the calculation functions

t.calculate.canvas = function()
{
	if (!t.canvas)
	{
		t.canvas = new Object()
	}

	// Userful for later calculation
	t.canvas.width = t.grid.width * t.grid.tile.width
	t.canvas.height = t.grid.height * t.grid.tile.height

	if (t.canvas.width >= window.innerWidth) // Make the toolbar always fill the top of the screen
	{
		document.getElementById('toolbar').style.width = t.canvas.width
	}
	else
	{
		document.getElementById('toolbar').style.width = '100%'
	}

	if (t.canvas.width >= window.innerWidth && t.canvas.height >= window.innerHeight - 50)
	{
		document.body.style.background = t.color // A preventative measure for screen flicker on resize
		t.dom.style.left = 0
	    t.dom.style.top = 50 // Leave room for the toolbar
		t.dom.width = t.canvas.width
	    t.dom.height = t.canvas.height
	}
	else
	{
		if (t.canvas.width >= window.innerWidth)
		{
			document.body.style.background = '#111111'
			t.dom.width = t.canvas.width
	    	t.dom.height = t.canvas.height
	    	t.dom.style.left = 0
	    	t.dom.style.top = (window.innerHeight - 50) / 2 - t.dom.height / 2 + 50
		}
		else if (t.canvas.height >= window.innerHeight - 50)
		{
			document.body.style.background = '#111111'
			t.dom.width = t.canvas.width
	    	t.dom.height = t.canvas.height
	    	t.dom.style.left = window.innerWidth / 2 - t.dom.width / 2
	    	t.dom.style.top = 50
		}
		else
		{
			document.body.style.background = '#111111'
			t.dom.width = t.canvas.width
	    	t.dom.height = t.canvas.height
	    	t.dom.style.left = window.innerWidth / 2 - t.dom.width / 2
	    	t.dom.style.top = (window.innerHeight - 50) / 2 - t.dom.height / 2 + 50
		}
	}

	t.calculate.grid()
}

t.calculate.grid = function()
{
    for (var y = 0; y < t.grid.height; y++)
    {
        for (var x = 0; x < t.grid.width; x++)
        {
            if (!t.database['row' + y])
            {
                t.database['row' + y] = new Object()
            }

            if (!t.database['row' + y]['column' + x])
            {
                t.database['row' + y]['column' + x] = new Object()
            }

            t.database['row' + y]['column' + x].x = 0 - t.grid.width / 2 * t.grid.tile.width + x * t.grid.tile.width
            t.database['row' + y]['column' + x].y = 0 - t.grid.height / 2 * t.grid.tile.height + y * t.grid.tile.height
        }
    }
}

t.calculate.fill = function(row, column, similar)
{
	// Calculate the bucket tool's "domain" that it will fill
}

t.draw = new Object() // Group the draw functions

t.draw.clear = function()
{
	t.ctx.fillStyle = '#' + t.color
	t.ctx.fillRect(0, 0, t.dom.width, t.dom.height)
}

t.draw.line = function(x1, y1, x2, y2, width, color, opacity, dash)
{
	if (opacity > 0)
	{
		t.ctx.beginPath()
		t.ctx.moveTo(Math.round(x1) + 0.5, Math.round(y1) + 0.5)
		t.ctx.lineTo(Math.round(x2) + 0.5, Math.round(y2) + 0.5)
		t.ctx.lineWidth = width
		t.ctx.strokeStyle = '#' + color
		if (dash)
		{
			t.ctx.setLineDash([dash])
		}
		if (opacity)
		{
			t.ctx.globalAlpha = opacity
		}
		else
		{
			t.ctx.globalAlpha = 1
		}
		t.ctx.stroke()
	}
}

t.draw.rectangle = function(x, y, width, height, color, opacity)
{
	if (opacity > 0)
	{
		t.ctx.beginPath()
		t.ctx.rect(x, y, width, height)
		t.ctx.fillStyle = color
		if (opacity)
		{
			t.ctx.globalAlpha = opacity
		}
		else
		{
			t.ctx.globalAlpha = 1
		}
		t.ctx.fill()
	}
}

t.draw.grid = function()
{
	for (var i = 1; i < t.grid.width; i++)
	{
		t.draw.line(i * t.grid.tile.width, 0, i * t.grid.tile.width, t.canvas.height, 1, t.grid.color, t.grid.opacity, 4)
	}

	for (var i = 1; i < t.grid.height; i++)
	{
		t.draw.line(0, i * t.grid.tile.height, t.canvas.width, i * t.grid.tile.height, 1, t.grid.color, t.grid.opacity, 4)
	}

	for (var i = 0; i < t.grid.height; i++)
	{
		for (var j = 0; j < t.grid.width; j++)
		{
			t.draw.rectangle(j * t.grid.tile.width + t.grid.tile.width / 2, i * t.grid.tile.height + t.grid.tile.height / 2, 1, 1, t.grid.color, t.grid.opacity)
		}
	}
}

t.draw.objects = function()
{
	for (var i = 0; i < t.grid.height; i++)
	{
		for (var j = 0; j < t.grid.width; j++)
		{
			if (t.database['row' + i]['column' + j] == 1)
			{
				t.draw.rectangle(j * t.grid.tile.width, i * t.grid.tile.height, t.grid.tile.width, t.grid.tile.height, '#ff0000', 1)
			}
		}
	}
}