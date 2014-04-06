var earthSpeed = 0.5
var earthFriction = earthSpeed / 15
var moonSpeed = 0.75
var moonFriction = moonSpeed / 15

var camera = new Camera()
var keyboard = new Keyboard()

var game = new Lorina() // Required for all games
	game.setColor('#111111')
		.makeFullscreen()
		.setSize(l.canvas.width * 2, l.canvas.height * 2)

var earth = new Entity()
	earth.setSprite('images/earth.png')
		 .setPosition(l.dom.width / 2, l.dom.height / 2)
		 .setSize(125, 125)
		 .setAnchor(125 / 2, 125 / 2)
		 .setFriction(earthFriction)

var moon = new Entity()
	moon.setSprite('images/moon.png')
		.setPosition(50, 50)
		.setSize(85, 85)
		.setAnchor(85 / 2, 85 / 2)
		.setFriction(moonFriction)

// I would recommend that you keep the data for your room functions in an external file and reference it here
var main = function()
{
	camera.follow(earth, 0, 0)

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

	moon.pullToward(earth, moonSpeed).physics() // Pull the moon toward the earth

	earth.bounce().physics()

	game.blank()
	earth.buffer()
	moon.buffer()
	game.draw()
}

game.start(main) // Only call once the room functions are defined