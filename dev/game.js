var colorBlue = '#1C73E9'
var colorGreen = '#5CBE43'
var colorGreenDark = '#34881F'
var colorBrown = '#7D4F16'
var colorBlack = '#111111'

l.game.setup(colorBlue)
l.keyboard.enable()

l.debug.all = false

var health = 5
var canShoot = true
var coolTime = 500
var score = 0
var dragonVerticalMotion = 0
var movementPadding = 26
var boneSpacing = 18
var meteorSpeed = 100
var meteorSpeedIncrease = 3
var missileSpeed = 400
var fallSpeed = 0 // In pixels per second
var fallSpeedIncrease = 3
var fallSpeedMax = 200 // In pixels per second
var flightSpeedMax = 200
var tiltStartAngle = 15
var dragonSpeed = 140

l.canvas.width = l.canvas.width + movementPadding
l.canvas.height = l.canvas.height + movementPadding

var yGrass = l.canvas.height - 44
var yDragon = l.canvas.height - 38
var yDarkerGrass = l.canvas.height - 30
var yDirt = l.canvas.height - 22
var yBones = l.entities.camera.height - 12

l.audio.make('shoot', 'sounds/shoot.wav')
l.audio.make('explosion', 'sounds/explosion.wav')
l.audio.make('impact', 'sounds/impact.wav')
l.audio.make('gameover', 'sounds/gameover.wav')

l.object.make('dragon', l.canvas.width / 2, yDragon, 18, 20)
	l.object.sprite('dragon', 'images/dragon.png', 34, 20, 2, 300)
	l.object.bounding('dragon', 0, 0, 18, 20)
	l.object.anchor('dragon', 18 / 2, 19)
l.object.make('missile', l.canvas.width + 15, 0, 10, 10)
	l.object.sprite('missile', 'images/missile.png', 10, 10, 2, 150)
	l.object.bounding('missile', 0, 0, 5, 10)
	l.object.anchor('missile', 2, 5)

for (var i = 0; i < 5; i++) // Make a bunch of meteors
{
	l.object.make('meteor' + i, l.tools.random(movementPadding, l.canvas.width - movementPadding), 0 - 15, 15, 26)
		l.object.sprite('meteor' + i, 'images/meteor.png', 30, 26, 2, 100)
		l.object.bounding('meteor' + i, 0, 0, 15, 26)
		l.object.anchor('meteor' + i, 15 / 2, 25)
		l.object.category('meteor' + i, 'enemies')
}

l.object.make('bone1', l.entities.camera.width / 2 - boneSpacing * 2, yBones, 11, 11)
	l.object.sprite('bone1', 'images/bone.png', 11, 11)
	l.object.anchor('bone1', 11 / 2, 11 / 2)
l.object.make('bone2', l.entities.camera.width / 2 - boneSpacing, yBones, 11, 11)
	l.object.sprite('bone2', 'images/bone.png', 11, 11)
	l.object.anchor('bone2', 11 / 2, 11 / 2)
l.object.make('bone3', l.entities.camera.width / 2, yBones, 11, 11)
	l.object.sprite('bone3', 'images/bone.png', 11, 11)
	l.object.anchor('bone3', 11 / 2, 11 / 2)
l.object.make('bone4', l.entities.camera.width / 2 + boneSpacing, yBones, 11, 11)
	l.object.sprite('bone4', 'images/bone.png', 11, 11)
	l.object.anchor('bone4', 11 / 2, 11 / 2)
l.object.make('bone5', l.entities.camera.width / 2 + boneSpacing * 2, yBones, 11, 11)
	l.object.sprite('bone5', 'images/bone.png', 11, 11)
	l.object.anchor('bone5', 11 / 2, 11 / 2)

l.game.start()

function game()
{
	if (l.game.state == 'loading')
	{
		l.draw.blank(colorBrown)
		l.text.write(l.preloader.percent + '% loaded', 10, l.entities.camera.height - 10, '#ffffff')
	}
	else if (l.game.state == 'menu')
	{
		if (l.keyboard.s)
		{
			l.game.state = 'running'
		}

		l.draw.blank(colorGreenDark)
		l.text.write('Press "S" to start', 10, l.entities.camera.height - 10, '#ffffff')
	}
	else if (l.game.state == 'paused')
	{
		if (l.keyboard.s)
		{
			l.game.state = 'running'
		}

		l.camera.reset()

		l.draw.blank(colorGreenDark)
		l.text.write('Score: ' + score, 10, 18, '#ffffff')
		l.text.write('PAUSED - Press "S" to resume', 10, l.entities.camera.height - 10, '#ffffff')
	}
	else if (l.game.state == 'running')
	{
		if (l.keyboard.escape)
		{
			l.game.state = 'paused'
		}

		// Fire control
		if (l.keyboard.a || l.keyboard.space)
		{
			if (canShoot && l.entities.missile.y < 0)
			{
				canShoot = false
				l.audio.rewind('shoot')
				l.audio.play('shoot')
				l.move.snap('missile', l.entities.dragon.anchor.x - 2, l.entities.dragon.anchor.y - 18)
				setTimeout(function()
				{
					canShoot = true
				}, coolTime)
			}
		}

		// Missile code
		if (l.entities.missile.anchor.y > l.entities.camera.y - 10)
		{
			l.move.up('missile', missileSpeed)
		}
		else
		{
			l.move.snap('missile', l.canvas.width + 15, 0)
		}

		l.move.down('enemies', meteorSpeed)

		// Meteor code
		/*
		if (l.entities.meteor.anchor.y < yDragon)
		{
			l.move.down('meteor', meteorSpeed)
		}
		else
		{
			l.camera.shake(5, 250, movementPadding)
			if (health > 0)
			{
				health -= 1
				if (health == 0)
				{
					l.audio.rewind('gameover')
					l.audio.play('gameover')
					l.game.state = 'gameover'
				}
				l.audio.rewind('impact')
				l.audio.play('impact')
			}
			l.move.snap('meteor', l.tools.random(movementPadding, l.canvas.width - movementPadding), 0 - 15)
		}
		*/

		/*
		if (l.collision.overlap('missile', 'meteor'))
		{
			l.audio.rewind('explosion')
			l.audio.play('explosion')
			score++
			meteorSpeed += meteorSpeedIncrease
			l.move.snap('missile', l.canvas.width + 15, 0)
			l.move.snap('meteor', l.tools.random(movementPadding, l.canvas.width - movementPadding), 0 - 15)
		}
		*/

		if (l.keyboard.right) // Movement control
		{
			if (l.entities.dragon.anchor.x < l.canvas.width - movementPadding)
	    	{
				l.move.right('dragon', dragonSpeed)
			}
		}
		else if (l.keyboard.left)
		{
			if (l.entities.dragon.anchor.x > movementPadding)
	    	{
				l.move.left('dragon', dragonSpeed)
			}
		}

		if (l.keyboard.up) // Jetpack control
		{
			if (fallSpeed > -flightSpeedMax)
			{
				fallSpeed -= dragonSpeed / 6
			}
		}

		if (fallSpeed < fallSpeedMax) // Gravity
		{
			fallSpeed += fallSpeedIncrease
		}

		// Dragon's vertical movement code
		if (fallSpeed < 0)
		{
			if (l.entities.dragon.anchor.y > movementPadding)
			{
				l.move.up('dragon', Math.abs(fallSpeed))
			}
		}
		else
		{
			if (l.entities.dragon.anchor.y < yDragon)
			{
				l.move.down('dragon', Math.abs(fallSpeed))
			}
			else
			{
				fallSpeed = 0
			}
		}

		l.camera.follow('dragon', 10, 10)

		l.draw.blank()
		l.draw.rectangle(0, yGrass, l.canvas.width, yDarkerGrass - yGrass, colorGreen) // Grass
		l.draw.rectangle(0, yDarkerGrass, l.canvas.width, yDirt - yDarkerGrass, colorGreenDark) // Darker grass
		l.draw.rectangle(0, yDirt, l.canvas.width, l.canvas.height - yDirt, colorBrown) // Dirt
		l.draw.object('missile')
		l.draw.object('dragon')

		l.draw.object('enemies')

		l.text.write('Score: ' + score, 10, 18, '#ffffff', 'hud')

		if (health >= 1)
		{
			l.draw.object('bone1', 'hud')
		}
		if (health >= 2)
		{
			l.draw.object('bone2', 'hud')
		}
		if (health >= 3)
		{
			l.draw.object('bone3', 'hud')
		}
		if (health >= 4)
		{
			l.draw.object('bone4', 'hud')
		}
		if (health == 5)
		{
			l.draw.object('bone5', 'hud')
		}
	}
	else if (l.game.state == 'gameover')
	{
		if (l.keyboard.s)
		{
			score = 0
			health = 5
			meteorSpeed = 100
			fallSpeed = 0
			l.move.snap('dragon', l.canvas.width / 2, yDragon)
			l.game.state = 'running'
		}

		l.camera.reset()

		l.draw.blank(colorBrown)
		l.text.write('Score: ' + score, 10, 18, '#ffffff')
		l.text.write('GAMEOVER - Press "S" to retry', 10, l.entities.camera.height - 10, '#ffffff')
	}
}