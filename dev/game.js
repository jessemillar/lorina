var colorBlue = '#1C73E9'
var colorGreen = '#5CBE43'
var colorGreenDark = '#34881F'
var colorBrown = '#7D4F16'

l.debug.all = false

var health = 5
var canShoot = true
var coolTime = 500
var score = 0
var dragonSpeed = 175
var movementPadding = 20
var boneY = 239
var boneSpacing = 15
var meteorSpeed = 100
var meteorSpeedIncrease = 3
var missileSpeed = 400

l.game.setup(colorBlue)
l.keyboard.enable()

l.audio.make('shoot', 'sounds/shoot.wav')
l.audio.make('explosion', 'sounds/explosion.wav')
l.audio.make('impact', 'sounds/impact.wav')
l.audio.make('gameover', 'sounds/gameover.wav')

l.object.make('dragon', l.entities.camera.width / 2, 200, 18, 20)
	l.object.sprite('dragon', 'images/dragon.png', 34, 20, 2, 300)
	l.object.anchor('dragon', 18 / 2, 19)
	l.object.bounding('dragon', 0, 0, 18, 20)
l.object.make('missile', l.entities.camera.width + 15, 0, 10, 10)
	l.object.sprite('missile', 'images/missile.png', 10, 10, 2, 150)
	l.object.anchor('missile', 2, 5)
	l.object.bounding('missile', 0, 0, 5, 10)
l.object.make('meteor', l.tools.random(l.entities.camera.x + movementPadding, l.entities.camera.x + l.entities.camera.width - movementPadding), l.entities.camera.y - 15, 15, 26)
	l.object.sprite('meteor', 'images/meteor.png', 30, 26, 2, 100)
	l.object.anchor('meteor', 15 / 2, 25)
	l.object.bounding('meteor', 0, 0, 15, 26)

l.object.make('bone1', l.entities.camera.width / 2 - boneSpacing * 2, boneY, 11, 11)
	l.object.sprite('bone1', 'images/bone.png', 11, 11)
	l.object.anchor('bone1', 11 / 2, 11 / 2)
l.object.make('bone2', l.entities.camera.width / 2 - boneSpacing, boneY, 11, 11)
	l.object.sprite('bone2', 'images/bone.png', 11, 11)
	l.object.anchor('bone2', 11 / 2, 11 / 2)
l.object.make('bone3', l.entities.camera.width / 2, boneY, 11, 11)
	l.object.sprite('bone3', 'images/bone.png', 11, 11)
	l.object.anchor('bone3', 11 / 2, 11 / 2)
l.object.make('bone4', l.entities.camera.width / 2 + boneSpacing, boneY, 11, 11)
	l.object.sprite('bone4', 'images/bone.png', 11, 11)
	l.object.anchor('bone4', 11 / 2, 11 / 2)
l.object.make('bone5', l.entities.camera.width / 2 + boneSpacing * 2, boneY, 11, 11)
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

		l.draw.blank(colorGreenDark)
		l.text.write('Score: ' + score, 10, 18, '#ffffff')
		l.text.write('PAUSED - Press "S" to resume', 10, l.entities.camera.height - 10, '#ffffff')
	}
	else if (l.game.state == 'running')
	{
		// Pause control
		if (l.keyboard.escape)
		{
			l.game.state = 'paused'
		}

		// Fire control
		if (l.keyboard.a || l.keyboard.space)
		{
			if (canShoot)
			{
				canShoot = false
				l.audio.rewind('shoot')
				l.audio.play('shoot')
				l.move.snap('missile', l.entities.dragon.anchor.x - 4, l.entities.dragon.anchor.y - 23)
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
			l.move.snap('missile', l.entities.camera.width + 15, 0)
		}

		// Meteor code
		if (l.entities.meteor.anchor.y < 196)
		{
			l.move.down('meteor', meteorSpeed)
		}
		else
		{
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
			l.move.snap('meteor', l.tools.random(l.entities.camera.x + movementPadding, l.entities.camera.x + l.entities.camera.width - movementPadding), l.entities.camera.y - 15)
		}

		if (l.collision.overlap('missile', 'meteor'))
		{
			l.audio.rewind('explosion')
			l.audio.play('explosion')
			score++
			meteorSpeed += meteorSpeedIncrease
			l.move.snap('missile', l.entities.camera.width + 15, 0)
			l.move.snap('meteor', l.tools.random(l.entities.camera.x + movementPadding, l.entities.camera.x + l.entities.camera.width - movementPadding), l.entities.camera.y - 15)
		}

	    if (l.keyboard.left)
	    {
	    	if (l.entities.dragon.anchor.x > movementPadding)
	    	{
	  			l.move.left('dragon', dragonSpeed)
	    	}
	    }
	    else if (l.keyboard.right)
	    {
	    	if (l.entities.dragon.anchor.x < l.entities.camera.width - movementPadding)
	    	{
		        l.move.right('dragon', dragonSpeed)
		    }
	    }

		l.draw.blank()
		l.draw.rectangle(0, 175, l.entities.camera.width, 50, colorGreen) // Grass
		l.draw.rectangle(0, 225, l.entities.camera.width, 5, colorGreenDark) // Darker grass
		l.draw.rectangle(0, 230, l.entities.camera.width, 20, colorBrown) // Dirt
		l.draw.object('meteor')
		l.draw.object('missile')
		l.draw.object('dragon')

		l.text.write('Score: ' + score, 10, 18, '#ffffff')

		if (health >= 1)
		{
			l.draw.object('bone1')
		}
		if (health >= 2)
		{
			l.draw.object('bone2')
		}
		if (health >= 3)
		{
			l.draw.object('bone3')
		}
		if (health >= 4)
		{
			l.draw.object('bone4')
		}
		if (health == 5)
		{
			l.draw.object('bone5')
		}
	}
	else if (l.game.state == 'gameover')
	{
		if (l.keyboard.s)
		{
			score = 0
			health = 5
			meteorSpeed = 100
			l.game.state = 'running'
		}

		l.draw.blank(colorBrown)
		l.text.write('Score: ' + score, 10, 18, '#ffffff')
		l.text.write('GAMEOVER - Press "S" to retry', 10, l.entities.camera.height - 10, '#ffffff')
	}
}