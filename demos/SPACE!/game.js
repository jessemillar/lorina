var moonCount = 10
var starCount = 2000
var dustCount = 1000

var earthSpeed = 0.5
var earthFriction = earthSpeed / 15
var starSpeed = 0.4
var starFriction = 0.035

var game = new Lorina()
	game.setTitle('SPACE!')
		.setColor('#111111')
		.makeFullscreen()
		.setRoomSize(l.dom.width * 2, l.dom.height * 2)

var camera = new Camera()

var keyboard = new Keyboard()
var mouse = new Mouse()

var tool = new Tool()
var typewriter = new Typewriter()
	typewriter.setFont('Wendy').setColor('#FFFFFF').setAlignment('center').setSize(35)

var song = new Speaker()
	song.setFile('sounds/song.wav')

var gameover = new Speaker()
	gameover.setFile('sounds/gameover.wav')

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

var earth2 = new Entity()
	earth2.setSprite('images/earth.png')
		  .setPosition(l.room.width / 2 + 200, l.room.height / 2 + 200)
		  .setAnchor(125 / 2, 125 / 2)

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
	if (keyboard.up || keyboard.w)
	{
		earth.pushVertical(-earthSpeed)
	}
	else if (keyboard.down || keyboard.s)
	{
		earth.pushVertical(earthSpeed)
	}

	if (keyboard.left || keyboard.a)
	{
		earth.pushHorizontal(-earthSpeed)
	}
	else if (keyboard.right || keyboard.d)
	{
		earth.pushHorizontal(earthSpeed)
	}

	stars.pullToward(earth, starSpeed).applyPhysics()

	earth.bounce().applyPhysics()

	var j = game.checkCollision(earth, moons)
	if (j)
	{
		j.delete()
		gameover.play()
		camera.shake(2, 35, 250)
	}

	camera.follow(earth, earth2)

	game.blank()
	typewriter.setPosition(l.room.width / 2, l.room.height / 2 - 200).write('Hello, World.  Move with the arrow keys.')
	earth.buffer()
	earth2.buffer()
	moons.buffer()
	stars.buffer()
	dusties.buffer()
	game.draw()
}

game.start(loading) // Only call once the room functions are defined