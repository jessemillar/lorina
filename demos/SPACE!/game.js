var starCount = 1

var earthSpeed = 0.5
var earthFriction = earthSpeed / 15
var starSpeed = 0.4
var starFriction = 0.025

var game = new Lorina()
	game.setColor('#111111')
		.makeFullscreen()

var measure = new Measure()
var typewriter = new Typewriter()
	typewriter.setFont('Wendy').setColor('#FFFFFF').setAlignment('center').setSize(35)

var keyboard = new Keyboard()
var mouse = new Mouse()

var stars = new Group()

var star = new Blueprint()
	star.setSprite('images/star.png')
		.setAnchor(4, 4)

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
		 .setAnchor(10, 10)
		 .setBound(-10, -10, 125, 125)
		 .setFriction(earthFriction)
		 .flip('both')
	planets.add(earth)

var moon = new Entity()
	moon.setSprite('images/moon.png')
		 .setPosition(100, 100)
		 .setSize(100, 100)
		 .setAnchor(100 / 2, 100 / 2)
		 .setBound(100 / 2, 100 / 2, 100, 100)
		 .setFriction(starFriction)
	planets.add(moon)

// I would recommend that you keep the data for your room functions in an external file and reference it here
var loading = function()
{
	if (l.loaded)
	{
		game.setRoom(main)
	}

	game.blank('#FF0000')
}

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

	stars.physics().pullToward(earth, starSpeed)
	// moon.physics().pullToward(earth, starSpeed)

	earth.bounce().physics()

	if (game.collision(earth, moon))
	{
		game.collision(earth, moon).delete()
	}

	game.blank()
	typewriter.setPosition(l.dom.width / 2, 100).writeText('Welcome to the world, World.  Move with the arrow keys.')
	// planets.buffer()
	earth.draw().debug()
	stars.buffer()
	game.draw()
}

game.start(loading) // Only call once the room functions are defined