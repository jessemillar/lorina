var colorGround = '#111111'

l.game.setup(colorGround, true)
l.keyboard.enable()

l.debug.all = false

l.canvas.width = l.canvas.width * 2
l.canvas.height = l.canvas.height * 2

l.physics.friction(2)

var playerSpeed = 7
var playerDirection = 'right'
var bulletSpeed = 1000
var canShoot = true
var timeShoot = 250
var zombieCount = 150
var zombieSpeed = playerSpeed / 2
var zombieVisionDistance = 500
var score = 0
var scoreTime = 100

l.object.make('player', l.canvas.width / 2, l.canvas.height / 2, 20, 20)
	l.object.sprite('player', 'images/player.png')

l.prototype.make('zombie', 20, 20)
	l.prototype.sprite('zombie', 'images/zombie.png')
	l.prototype.categorize('zombie', 'zombies')

l.prototype.make('bullet', 5, 5)
	l.prototype.sprite('bullet', 'images/bullet.png')
	l.prototype.categorize('bullet', 'bullets')

l.prototype.make('blood', 5, 5)
	l.prototype.sprite('blood', 'images/blood.png')
	l.prototype.categorize('blood', 'bloods')

l.game.start()

var scoreInterval = setInterval(function()
					{
						if (l.game.state == 'running')
						{
							score++
						}
					}, scoreTime)

function game()
{
	if (l.game.state == 'loading')
	{
		l.draw.blank(colorGround)
		l.text.write(l.preloader.percent + '% loaded', 10, l.entities.camera.height - 10, '#ffffff')
	}
	else if (l.game.state == 'menu')
	{
		for (var i = 0; i < zombieCount; i++)
		{
			l.object.from('zombie', l.tool.random(0, l.canvas.width), l.tool.random(0, l.canvas.height))
		}

		l.game.state = 'running'
	}
	else if (l.game.state == 'paused')
	{
		if (l.keyboard.enter)
		{
			l.game.state = 'running'
		}

		l.camera.reset()

		l.draw.blank(colorGround)
		l.text.write('PAUSED - Press "Enter" to resume', 10, l.entities.camera.height - 10, '#ffffff')
	}
	else if (l.game.state == 'running')
	{
		if (l.keyboard.escape)
		{
			l.game.state = 'paused'
		}

		if (l.keyboard.up)
		{
			l.physics.push.up('player', playerSpeed)
			playerDirection = 'up'
		}
		else if (l.keyboard.down)
		{
			l.physics.push.down('player', playerSpeed)
			playerDirection = 'down'
		}

		if (l.keyboard.left)
		{
			l.physics.push.left('player', playerSpeed)
			playerDirection = 'left'
		}
		else if (l.keyboard.right)
		{
			l.physics.push.right('player', playerSpeed)
			playerDirection = 'right'
		}

		if (l.keyboard.space)
		{
			if (canShoot)
			{
				l.object.from('bullet', l.entities.player.anchor.x, l.entities.player.anchor.y)
				if (playerDirection == 'up')
				{
					l.physics.push.up('bullet' + l.object.latest.bullet, bulletSpeed)
				}
				else if (playerDirection == 'down')
				{
					l.physics.push.down('bullet' + l.object.latest.bullet, bulletSpeed)
				}
				else if (playerDirection == 'left')
				{
					l.physics.push.left('bullet' + l.object.latest.bullet, bulletSpeed)
				}
				else if (playerDirection == 'right')
				{
					l.physics.push.right('bullet' + l.object.latest.bullet, bulletSpeed)
				}

				canShoot = false

				setTimeout(function()
				{
					canShoot = true
				}, timeShoot)
			}
		}

		for (var i = 0; i < l.tool.count.category('zombies'); i++)
		{
			if (l.tool.measure.total('player', 'zombie' + i) < zombieVisionDistance)
			{
				l.physics.pull.toward('zombie' + i, 'player', zombieSpeed)
			}
		}

		l.collision('bullets', 'zombies', 'l.object.delete(a); l.object.delete(b)')

		// l.collision('player', 'zombies', 'l.game.state = "gameover"')

		l.physics.update('player')
		l.physics.update('bullets')
		l.physics.update('zombies')

		l.physics.bounce('player')
		l.physics.bounce('bullets')
		l.physics.bounce('zombies')

		l.camera.follow('player', 50, 50)

		l.draw.blank()
		l.buffer.object('player')
		l.buffer.object('zombies')
		l.buffer.object('bullets')
		l.draw.objects()

		l.text.write('SCORE: ' + score, 10, l.entities.camera.height - 10, '#ffffff', 'hud')
	}
	else if (l.game.state == 'gameover')
	{
		if (l.keyboard.enter)
		{
			l.physics.momentum.stop('player')
			l.physics.momentum.stop('zombies')
			l.physics.momentum.stop('bullets')
			l.move.snap('player', l.canvas.width / 2, l.canvas.height / 2)
			score = 0
			l.game.state = 'running'
		}

		l.camera.reset()

		l.draw.blank(colorGround)
		l.text.write('SCORE: ' + score, 10, 20, '#ffffff')
		l.text.write('GAMEOVER - Press "Enter" to retry', 10, l.entities.camera.height - 10, '#ffffff')
	}
}