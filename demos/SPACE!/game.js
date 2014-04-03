var earthSpeed = 0.5
var moonSpeed = 0.75

var game = new Lorina()
var keyboard = new Keyboard()
	keyboard.enable()

game.setup('#111111').fullscreen()

var earth = new Entity()
	earth.setSprite('images/earth.png')
		 .setPosition(window.dom.width / 2, window.dom.height / 2)
		 .setSize(125, 125)
		 .setAnchor(125 / 2, 125 / 2)
		 .setFriction(earthSpeed / 10)

var moon = new Entity()
	moon.setSprite('images/moon.png')
		.setPosition(50, 50)
		.setSize(85, 85)
		.setAnchor(85 / 2, 85 / 2)

// I would recommend that you keep the data for your room functions in an external file and reference it here
var main = function()
{
	if (keyboard.up) // If we're pressing the 'up' arrow key, do this...
	{
		earth.pushUp(earthSpeed)
	}
	else if (keyboard.down) // If we're pressing the 'down' arrow key, do this...
	{
		earth.pushDown(earthSpeed) // Push the earth down
	}

	if (keyboard.left) // If we're pressing the 'left' arrow key, do this...
	{
		earth.pushLeft(earthSpeed) // Push the earth left
	}
	else if (keyboard.right) // If we're pressing the 'right' arrow key, do this...
	{
		earth.pushRight(earthSpeed) // Push the earth right
	}

	/*
	physics.pull.toward('moon', 'earth', 25) // Pull the moon toward the earth
	physics.bounce('earth') // Make the 'earth' object bounce off the edges of the screen
	physics.update('celestial') // Update the physics of the objects in the 'celestial' category

	draw.blank() // Blank the screen before drawing
	buffer.object('celestial') // Buffer the objects in the 'celestial' category for later drawing
	draw.objects() // Draw the objects in the buffer after sorting them for z-ordering
	*/

	earth.physics().bounce()

	game.blank()
	earth.draw()
	moon.draw()
}

game.start(main) // Only call once the room functions are defined