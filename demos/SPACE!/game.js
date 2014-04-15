var moonCount = 10
var starCount = 2000
var dustCount = 1000

var earthSpeed = 0.5
var earthFriction = earthSpeed / 15
var starSpeed = 0.4
var starFriction = 0.035

var game = new Lorina()
	game.setColor('#111111')
		.makeFullscreen()
		.setRoomSize(l.dom.width * 2, l.dom.height * 2)

var camera = new Camera()

var tool = new Tool()
var typewriter = new Typewriter()
	typewriter.setFont('Wendy').setColor('#FFFFFF').setAlignment('center').setSize(35)

var song = new Speaker()
	song.setAudio('sounds/song.wav')

var gameover = new Speaker()
	gameover.setAudio('sounds/gameover.wav')

var keyboard = new Keyboard()

var moons = new Group()
var stars = new Group()
var dusties = new Group()

var earth = new Entity()
	earth.setSprite('images/earth.png')
		 .setPosition(l.room.width / 2, l.room.height / 2)
		 .setSize(125, 125)
		 .setAnchor(125 / 2, 125 / 2)
		 .setBound(-125 / 2, -125 / 2, 125, 125)
		 .setFriction(earthFriction)

var i = moonCount

while (i--)
{
	var entity = 'moon' + i

	var moon = new Entity()
		moon.setSprite('images/moon.png')
			 .setPosition(tool.random(0, l.room.width), tool.random(0, l.room.height))
			 .setSize(100, 100)
			 .setAnchor(100 / 2, 100 / 2)
			 .setBound(-100 / 2, -100 / 2, 100, 100)
			 .setFriction(starFriction)
		moons.add(moon)
}

var i = starCount

while (i--)
{
	var entity = 'star' + i

	var entity = new Entity()
		entity.setSprite('images/star.png')
			  .setAnchor(4, 4)
			  .setPosition(tool.random(0, l.room.width), tool.random(0, l.room.height))
			  .setFriction(starFriction)
		stars.add(entity)
}

var i = dustCount

while (i--)
{
	var entity = 'dust' + i

	var entity = new Entity()
		entity.setSprite('images/dust.png')
			  .setAnchor(2, 2)
			  .setPosition(tool.random(0, l.room.width), tool.random(0, l.room.height))
		dusties.add(entity)
}

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
		gameover.loop()
		earth.pushUp(earthSpeed)
	}
	else if (keyboard.down)
	{
		gameover.pause()
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

	stars.pullToward(earth, starSpeed).updatePhysics()
	// moons.pullToward(earth, starSpeed / 8).updatePhysics()

	earth.bounce().updatePhysics()

	var j = game.checkCollision(earth, moons)

	if (j)
	{
		j.delete()
		camera.shake(50, 5, 500)
	}

	camera.follow(earth)

	game.blank()
	typewriter.setPosition(l.room.width / 2, l.room.height / 2 - 200).write('Welcome to space, Mr. World.  Move with the arrow keys.')
	earth.buffer()
	moons.buffer()
	stars.buffer()
	dusties.buffer()
	game.draw()

	// moons.debug()
}

game.start(loading) // Only call once the room functions are defined