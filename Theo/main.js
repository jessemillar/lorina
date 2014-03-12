t.setup('111111', 35, 35)
t.start()

document.getElementById('tile-width').value = t.grid.width
document.getElementById('tile-height').value = t.grid.height
document.getElementById('background-color').value = t.color
document.getElementById('grid-color').value = t.grid.color
document.getElementById('grid-opacity').value = t.grid.opacity

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

function hideOverlay()
{
	document.getElementById('overlay').style.right = '-225px'
}

function showOverlay()
{
	document.getElementById('overlay').style.right = '0px'
}

function updatePreferences()
{
	t.grid.width = document.getElementById('tile-width').value
	t.grid.height = document.getElementById('tile-height').value
	t.color = document.getElementById('background-color').value
	t.grid.color = document.getElementById('grid-color').value
	t.grid.opacity = document.getElementById('grid-opacity').value
}