t.setup(35, 35, 15, 15, '7FDBFF', '39CCCC', 50)
t.start()

updateUI()

function main()
{
	t.draw.clear()
	t.draw.grid()
}

function openHat()
{
	document.getElementById('hat').style.display = 'block'
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