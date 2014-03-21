var moonSpeed = 25

l.game.setup('#111111', false, false, true) // Make the game fullscreen and don't enable Game Center or iAds since we're not running natively on an iOS device
l.keyboard.enable() // Let's use the keyboard, shall we?

l.physics.friction(2) // Set the friction value

l.object.make('earth', l.canvas.width / 2, l.canvas.height / 2, 125, 125) // Make the 'earth' object and center it in the middle of the canvas
	l.object.sprite('earth', 'images/earth.png') // Define a sprite for the object
	l.object.anchor('earth', 125 / 2, 125 / 2) // Make the anchor at the center of the 'earth'
	l.object.categorize('earth', 'celestial') // Categorize the object to simplify draw and movement commands later

l.object.make('moon', 50, 50, 85, 85) // Make the 'moon' object
	l.object.sprite('moon', 'images/moon.png') // Define a sprite for the object
	l.object.anchor('moon', 85 / 2, 85 / 2) // Make the anchor at the center of the 'moon'
	l.object.categorize('moon', 'celestial') // Categorize the object to simplify draw and movement commands later

l.game.start('game') // Tell the preloader to load everything and then go to the 'game' screen

l.screen.game = function() // This is our 'game' screen that's run by the preloader
{
	if (l.keyboard.up) // If we're pressing the 'up' arrow key, do this...
	{
		l.physics.push.up('earth', 10) // Push the earth up
	}
	else if (l.keyboard.down) // If we're pressing the 'down' arrow key, do this...
	{
		l.physics.push.down('earth', 10) // Push the earth down
	}

	if (l.keyboard.left) // If we're pressing the 'left' arrow key, do this...
	{
		l.physics.push.left('earth', 10) // Push the earth left
	}
	else if (l.keyboard.right) // If we're pressing the 'right' arrow key, do this...
	{
		l.physics.push.right('earth', 10) // Push the earth right
	}

	l.physics.pull.toward('moon', 'earth', moonSpeed) // Pull the moon toward the earth
	l.physics.bounce('earth') // Make the 'earth' object bounce off the edges of the screen
	l.physics.update('celestial') // Update the physics of the objects in the 'celestial' category

	l.draw.blank() // Blank the screen before drawing
	l.buffer.object('celestial') // Buffer the objects in the 'celestial' category for later drawing
	l.draw.objects() // Draw the objects in the buffer after sorting them for z-ordering
}