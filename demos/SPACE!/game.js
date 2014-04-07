var starCount = 2

var earthSpeed = 0.5
var earthFriction = earthSpeed / 15
var moonSpeed = 0.75
var moonFriction = moonSpeed / 15
var starSpeed = moonSpeed / 2
var starFriction = moonFriction / 2

var game = new Lorina()
	game.setColor('#111111')
		.makeFullscreen()

var measure = new Measure()

var keyboard = new Keyboard()
var mouse = new Mouse()

var stars = new Group()

var star = new Blueprint()
	star.setSprite('images/star.png')
		.setSize(10, 10)
		.setAnchor(5, 5)

var i = starCount

while (i--)
{
	var entity = 'star' + i

	var entity = new Entity()
		entity.copy(star)
			  .setPosition(measure.random(0, l.canvas.width), measure.random(0, l.canvas.height))
			  .setFriction(starFriction)
		stars.add(entity)
}

var planets = new Group()

var earth = new Entity()
	earth.setSprite('images/earth.png')
		 .setPosition(l.dom.width / 2, l.dom.height / 2)
		 .setSize(125, 125)
		 .setAnchor(125 / 2, 125 / 2)
		 .setFriction(earthFriction)
	planets.add(earth)

var moon = new Entity()
	moon.setSprite('images/moon.png')
		.setPosition(50, 50)
		.setSize(85, 85)
		.setAnchor(85 / 2, 85 / 2)
		.setFriction(moonFriction)
	planets.add(moon)

// I would recommend that you keep the data for your room functions in an external file and reference it here
var main = function()
{
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
	stars.pullToward(earth, starSpeed).physics()

	earth.bounce().physics()

	game.blank()
	planets.buffer()
	stars.buffer()
	game.draw()
}

game.start(main) // Only call once the room functions are defined