var starCount = 50

var earthSpeed = 0.5
var earthFriction = earthSpeed / 15
var moonSpeed = 0.75
var moonFriction = moonSpeed / 15

game = new Lorina()
game.setColor('#111111')
	.makeFullscreen()

keyboard = new Keyboard()
mouse = new Mouse()

earth = new Entity()
earth.setSprite('images/earth.png')
	 .setPosition(l.dom.width / 2, l.dom.height / 2)
	 .setSize(125, 125)
	 .setAnchor(125 / 2, 125 / 2)
	 .setFriction(earthFriction)
	 .setGroup('planets')

moon = new Entity()
moon.setSprite('images/moon.png')
	.setPosition(50, 50)
	.setSize(85, 85)
	.setAnchor(85 / 2, 85 / 2)
	.setFriction(moonFriction)
	.setGroup('planets')

// I would recommend that you keep the data for your room functions in an external file and reference it here
var main = function()
{
	if (keyboard.space)
	{
		earth.delete()
	}

	if (keyboard.up)
	{
		earth.pushUp(earthSpeed)
	}
	else if (keyboard.down)
	{
		earth.pushDown(earthSpeed)
	}

	if (keyboard.left)
	{
		earth.pushLeft(earthSpeed)
	}
	else if (keyboard.right)
	{
		earth.pushRight(earthSpeed)
	}

	moon.pullToward(earth, moonSpeed).physics()

	earth.bounce().physics()

	game.blank()
	earth.buffer()
	moon.buffer()
	game.draw()
}

game.start(main) // Only call once the room functions are defined