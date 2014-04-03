var game = new Lorina()
var keyboard = new Keyboard()
	keyboard.enable()

var moonSpeed = 25

game.setup('#111111')

// physics.friction(2) // Set the friction value

var earth = new Entity()
	earth.setPosition(game.dom.width / 2, game.dom.height / 2)
		 .setSize(125, 125)
		 .setAnchor(125 / 2, 125 / 2)

var moon = new Entity()
	moon.setPosition(50, 50)
		.setSize(85, 85)
		.setAnchor(85 / 2, 85 / 2)

// game.start('game') // Tell the preloader to load everything and then go to the 'game' screen

screen.game = function() // This is our 'game' screen that's run by the preloader
{
	/*
	if (keyboard.up) // If we're pressing the 'up' arrow key, do this...
	{
		physics.push.up('earth', 10) // Push the earth up
	}
	else if (keyboard.down) // If we're pressing the 'down' arrow key, do this...
	{
		physics.push.down('earth', 10) // Push the earth down
	}

	if (keyboard.left) // If we're pressing the 'left' arrow key, do this...
	{
		physics.push.left('earth', 10) // Push the earth left
	}
	else if (keyboard.right) // If we're pressing the 'right' arrow key, do this...
	{
		physics.push.right('earth', 10) // Push the earth right
	}

	physics.pull.toward('moon', 'earth', moonSpeed) // Pull the moon toward the earth
	physics.bounce('earth') // Make the 'earth' object bounce off the edges of the screen
	physics.update('celestial') // Update the physics of the objects in the 'celestial' category

	draw.blank() // Blank the screen before drawing
	buffer.object('celestial') // Buffer the objects in the 'celestial' category for later drawing
	draw.objects() // Draw the objects in the buffer after sorting them for z-ordering
	*/
}