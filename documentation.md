The "l" object encompasses the entire engine.  Every function relating to Lorina will be preceded by an "l."

In order for Lorina to run a game, you must supply your own game() function which will then be run at sixty frames-per-second.  See the included demo game for the game() function syntax and a basic overview of the order you should call functions in.

Available functions:

l.game.setup(gameColor)
	Grabs needed variables and references in addition to setting the attributes of the camera.  Must be called before running l.game.start().

l.game.start()
	Fires the preloader which then "starts" the game via a variable change after all images are loaded.

l.game.pause()
	Pauses the game.  Only has an effect if the game is already running.

l.camera.follow(name, sandboxWidth, sandboxHeight)
	Make the camera follow a specified object.  The sandbox dimensions refer to how far the object can travel from the center of the screen before the camera begins tracking.  Call inside the main game loop.

l.tools.random(min, max)
	Generate a random number between two values.

l.audio.make(name, location)
	Adds and loads an audio file via the preloader.  Should be called before running l.game.start().

l.audio.play(name)
	Play an audio file after it has been loaded.

l.audio.pause(name)
	Pause an audio file that is currently playing.
	
l.audio.rewind(name)
	Rewind an audio file that has already played or is currently playing.  This function exists to allow easily playing a sound effect just once instead of sixty times a second.

l.audio.loop(name)
	Play an audio file that will loop until you tell it to stop with l.audio.pause().

l.collision.overlap(objectA, objectB)
	Check for collisions between two objects.  Call inside the main game loop.

l.draw.blank(color)
	If "color" is neglected, the function will default to blanking the screen using the color set with l.game.setup(gameColor)

l.draw.rectangle(x, y, width, height, color, opacity)
	Draw a rectangle at a specified point with certain dimensions.  Opacity may be neglected if the shape is meant to be opaque.

l.draw.object(name)
	Draw an object.  Call after running l.draw.blank(color).

l.keyboard.enable()
	Tell Lorina to start watching for keyboard input.

	Each of these variables will be set to false if the key is not pressed and true if it is.
		l.keyboard.enter
		l.keyboard.shift
		l.keyboard.a
		l.keyboard.s
		l.keyboard.up
		l.keyboard.down
		l.keyboard.left
		l.keyboard.right

l.mouse.enable()
	Tell Lorina to start watching the mouse.

	l.mouse.x
		The mouse's current x coordinate in relation to the game screen.
	l.mouse.y
		The mouse's current x coordinate in relation to the game screen.

	l.mouse.clicked.x
		The x coordinate of a click in relation to the game screen.
	l.mouse.clicked.y
		The x coordinate of a click in relation to the game screen.

l.object.make(name, x, y, width, height)
	Make a basic object with name, position, width, and height values.

l.object.sprite(name, location, width, height, count, timer)
	Add a sprite to an already-created object.  Specify the object you want to attach the sprite to, the location of the image file, the width and height of the image file, how many frames are contained in the image if it is an animating sprite sheet, and the amount of time between each frame in the animation.  If the sprite is a static image, the count and timer values can be neglected.

l.object.anchor(name, x, y)
	Set the anchor point for an already-created object.  The anchor point is the point the object will be drawn at.  This is useful for making players draw with their feet on the ground or similar.

l.object.bounding(name, x, y, width, height)
	Set the bounding box for an already-created object.  Specify the object to add a bounding box to, give an x and y coordinate for the top-left corner of the bounding box in relation to the top-left corner of the object, and a width and height value for the bounding box.

l.move.snap(name, x, y)
	Instantly snap an object to a new x and y position.

l.move.up(name, speed)
	Move an object up at a specified speed in pixels-per-second.
l.move.down(name, speed)
	Move an object down at a specified speed in pixels-per-second.
l.move.left(name, speed)
	Move an object left at a specified speed in pixels-per-second.
l.move.right(name, speed)
	Move an object right at a specified speed in pixels-per-second.
l.move.toward(objectA, objectB, speed)
	Move an object toward another object at a specified speed in pixels-per-second.

l.measure.x(objectA, objectB)
	Finds how many pixels horizontally separate the anchor points of two objects.
l.measure.y(objectA, objectB)
	Finds how many pixels vertically separate the anchor points of two objects.
l.measure.total(objectA, objectB)
	Finds how many pixels separate the anchor points of two objects in a straight line.

l.preloader.percent
	A variable representing the percent of how many of the desired images and sound files have loaded.

l.text.write(string, x, y, color)
	Write a string of text to the screen as a specified point with a specified color.  The text is drawn starting at the bottom-left corner of the first character.

l.touches.enable()
	Tell Lorina to start watching for touches from a mobile device.
l.touches.database
	This is a variable array that represents each of the touches that are currently happening.  If there are three fingers touching the screen in different spots, l.touches.database[2].x would represent the x coordinate of the third finger (I need to verify this).

There are a number of debug variables which, if set to true, will draw or console.log relating information.
	l.debug.all
		Tells Lorina to draw and console.log all possible debug information.
	l.debug.mouse
		console.logs the mouse's current position and the position of any clicks.
	l.debug.keyboard
		console.logs which keys are being pressed.
	l.debug.touches
		console.logs current touch locations.
	l.debug.names
		Draws the names of objects to the right of the object in the game.
	l.debug.anchor
		Draws a yellow pixel at the anchor point of all objects.
	l.debug.bounding
		Draws a semi-transparent, green box to show the bounding box of each object.
	l.debug.position
		Draws a blue pixel at the top-left corner of all objects.