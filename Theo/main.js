t.setup(35, 35, 15, 15, '7FDBFF', '39CCCC', 50)
t.calculate.grid()
t.start()

updateUI() // Initial update of UI values

t.block = 1
var tool
penTool()

function main()
{
	if (t.mouse.clicked && t.mouse.inside())
	{
		var row = Math.floor(t.mouse.y / t.grid.tile.height)
		var column = Math.floor(t.mouse.x / t.grid.tile.width)

		if (tool == 'pen')
		{
			t.database['row' + row]['column' + column] = 1
		}
		else if (tool == 'bucket')
		{
			for (var i = 0; i < t.grid.height; i++)
			{
				for (var j = 0; j < t.grid.width; j++)
				{
					t.database['row' + i]['column' + j] = 1
				}
			}
		}
		else if (tool == 'eraser')
		{
			t.database['row' + row]['column' + column] = 0
		}
	}

	t.draw.clear()
	t.draw.grid()
	t.draw.objects()
}

function penTool()
{
	t.dom.style.cursor = 'crosshair'
	tool = 'pen'
}

function bucketTool()
{
	t.dom.style.cursor = 'move'
	tool = 'bucket'
}

function eraserTool()
{
	t.dom.style.cursor = 'cell'
	tool = 'eraser'
}

function openHat()
{
	document.getElementById('hat').style.display = 'pen'
	hideOverlay()
}

function closeHat()
{
	document.getElementById('hat').style.display = 'none'
}

function updateUI()
{
	document.getElementById('tile-width').value = t.grid.tile.width
	document.getElementById('tile-height').value = t.grid.tile.height
	document.getElementById('grid-width').value = t.grid.width
	document.getElementById('grid-height').value = t.grid.height
	document.getElementById('background-color').value = t.color
	document.getElementById('grid-color').value = t.grid.color
	document.getElementById('grid-opacity').value = t.grid.opacity * 100

	document.getElementById('background-color').style.backgroundColor = t.color
	document.getElementById('grid-color').style.backgroundColor = t.grid.color
	if (t.grid.opacity < 0.3)
	{
		document.getElementById('grid-opacity').style.opacity = 0.3
	}
	else
	{
		document.getElementById('grid-opacity').style.opacity = t.grid.opacity
	}
}

function updatePreferences()
{
	t.grid.tile.width = document.getElementById('tile-width').value
	t.grid.tile.height = document.getElementById('tile-height').value
	t.grid.width = document.getElementById('grid-width').value
	t.grid.height = document.getElementById('grid-height').value
	t.color = document.getElementById('background-color').value
	t.grid.color = document.getElementById('grid-color').value
	t.grid.opacity = document.getElementById('grid-opacity').value / 100

	if (t.grid.tile.width > 999)
	{
		t.grid.tile.width = 999
	}
	else if (t.grid.tile.width < 1)
	{
		t.grid.tile.width = 1
	}

	if (t.grid.tile.height > 999)
	{
		t.grid.tile.height = 999
	}
	else if (t.grid.tile.height < 1)
	{
		t.grid.tile.height = 1
	}

	if (t.grid.width > 999)
	{
		t.grid.width = 999
	}
	else if (t.grid.width < 1)
	{
		t.grid.width = 1
	}

	if (t.grid.height > 999)
	{
		t.grid.height = 999
	}
	else if (t.grid.height < 1)
	{
		t.grid.height = 1
	}

	if (t.grid.opacity > 100)
	{
		t.grid.opacity = 100
	}
	else if (t.grid.opacity < 0)
	{
		t.grid.opacity = 0
	}

	t.calculate.canvas()

	updateUI()
}