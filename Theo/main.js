t.setup('2ECC40', '3D9970', 50, 35, 35)
t.start()

document.getElementById('tile-width').value = t.grid.width
document.getElementById('tile-height').value = t.grid.height
document.getElementById('background-color').value = t.color
document.getElementById('grid-color').value = t.grid.color
document.getElementById('grid-opacity').value = t.grid.opacity * 100

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

function updatePreferences()
{
	t.grid.width = document.getElementById('tile-width').value
	t.grid.height = document.getElementById('tile-height').value
	t.color = document.getElementById('background-color').value
	t.grid.color = document.getElementById('grid-color').value
	t.grid.opacity = document.getElementById('grid-opacity').value / 100
}