var colorGround = '#111111'

l.game.setup(colorGround, true)
l.keyboard.enable()

l.debug.all = false

l.canvas.width = l.canvas.width * 2
l.canvas.height = l.canvas.height * 2

l.physics.friction(2)

var safeZone = 150
var playerSpeed = 7
var playerDirection = 'right'
var bulletForce = 1000
var gibletForce = 100
var canShoot = true
var timeShoot = 250
var canEmpty = true
var timeEmpty = 150
var respawnForce = 250
var zombieCount = l.canvas.width / 25
var zombieSpeed = playerSpeed / 2
var zombieVisionDistance = l.canvas.width / 4
var allowedBullets = 3
var spawned = false

var seconds = 0
var killed = 0
var score = 0
var newHighscore = false

if (localStorage.getItem('highscore'))
{
	var highscore = localStorage.getItem('highscore')
}
else
{
	var highscore = 0
}

l.audio.make('song', 'sounds/song.wav')
l.audio.make('bounce', 'sounds/bounce.wav')
l.audio.make('empty', 'sounds/empty.wav')
l.audio.make('gameover', 'sounds/gameover.wav')
l.audio.make('kill', 'sounds/kill.wav')
l.audio.make('shoot', 'sounds/shoot.wav')

l.object.make('player', l.canvas.width / 2, l.canvas.height / 2, 20, 20)
	l.object.sprite('player', 'images/player.png')
	l.object.anchor('player', 10, 20)

l.prototype.make('zombie', 20, 20)
	l.prototype.sprite('zombie', 'images/zombie.png')
	l.prototype.categorize('zombie', 'zombies')
	l.prototype.anchor('zombie', 10, 20)

l.prototype.make('bullet', 5, 5)
	l.prototype.sprite('bullet', 'images/bullet.png')
	l.prototype.categorize('bullet', 'bullets')

l.prototype.make('giblet', 5, 5)
	l.prototype.sprite('giblet', 'images/giblet.png')
	l.prototype.categorize('giblet', 'giblets')

l.game.start()

var scoreInterval = setInterval(function()
					{
						if (l.game.state == 'running')
						{
							seconds++
						}
					}, 1000)

function game()
{
	if (l.game.state == 'loading')
	{
		l.draw.blank(colorGround)
		l.text.write(l.preloader.percent + '% loaded', 10, l.entities.camera.height - 10, '#ffffff')
	}
	else if (l.game.state == 'menu')
	{
		if (l.keyboard.enter)
		{
			l.audio.loop('song')
			l.game.state = 'running'
		}

		l.draw.blank()
		l.text.write('Press "Enter" to start', 10, l.entities.camera.height - 10, '#ffffff')
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
		if (l.tool.count.category('zombies') == 0)
		{
			for (var i = 0; i < zombieCount; i++)
			{
				l.object.from('zombie', l.tool.random(0, l.canvas.width), l.tool.random(0, l.canvas.height))
			}

			for (var i = 0; i < zombieCount; i++)
			{
				if (l.tool.measure.total('player', 'zombie' + (Math.round(l.object.latest.zombie - zombieCount) + i)) < safeZone)
				{
					l.move.snap('zombie' + (Math.round(l.object.latest.zombie - zombieCount) + i), 20, 20)
				}
			}

			spawned = true
		}

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
				if (l.tool.count.category('bullets') < allowedBullets)
				{
					l.audio.rewind('shoot')
					l.audio.play('shoot')

					l.object.from('bullet', l.entities.player.anchor.x, l.entities.player.anchor.y - 10)
					if (playerDirection == 'up')
					{
						l.physics.push.up('bullet' + l.object.latest.bullet, bulletForce)
					}
					else if (playerDirection == 'down')
					{
						l.physics.push.down('bullet' + l.object.latest.bullet, bulletForce)
					}
					else if (playerDirection == 'left')
					{
						l.physics.push.left('bullet' + l.object.latest.bullet, bulletForce)
					}
					else if (playerDirection == 'right')
					{
						l.physics.push.right('bullet' + l.object.latest.bullet, bulletForce)
					}

					canShoot = false

					setTimeout(function()
					{
						canShoot = true
					}, timeShoot)
				}
				else if (canEmpty)
				{
					l.audio.rewind('empty')
					l.audio.play('empty')

					canEmpty = false

					setTimeout(function()
					{
						canEmpty = true
					}, timeEmpty)
				}
			}
		}

		var thingy = Object.keys(l.entities)

		for (var i = 0; i < thingy.length; i++)
		{
			if (l.entities[thingy[i]].category == 'zombies')
			{
				if (l.tool.measure.total('player', thingy[i]) < zombieVisionDistance)
				{
					l.physics.pull.toward(thingy[i], 'player', zombieSpeed)
				}
			}
		}

		l.collision('bullets', 'zombies', 'killZombie(a, b)')

		l.collision('player', 'zombies', 'gameover()')

		l.physics.update('player')
		l.physics.update('bullets')
		l.physics.update('zombies')
		l.physics.update('giblets')

		l.physics.bounce('player')
		l.physics.bounce('bullets')
		l.physics.bounce('zombies')
		l.physics.bounce('giblets')

		l.camera.follow('player', 50, 50)

		l.draw.blank()
		l.buffer.object('player')
		l.buffer.object('zombies')
		l.buffer.object('giblets')
		l.buffer.object('bullets')
		l.draw.objects()

		l.text.write(score, 10, l.entities.camera.height - 10, '#ffffff', 'hud')
	}
	else if (l.game.state == 'gameover')
	{
		if (l.keyboard.enter)
		{
			l.physics.momentum.stop('player')
			l.object.delete('bullets')
			l.object.delete('zombies')
			l.object.delete('giblets')
			l.move.snap('player', l.canvas.width / 2, l.canvas.height / 2)
			seconds = 0
			killed = 0
			score = 0
			l.game.state = 'running'
		}

		l.camera.reset()

		l.draw.blank(colorGround)
		if (seconds < 60)
		{
			l.text.write('You survived for ' + seconds + ' seconds and killed ' + killed + ' zombies for a score of ' + score + ' points', 10, 20, '#ffffff')
		}
		else
		{
			l.text.write('You survived for ' + seconds / 60 + ' minutes and killed ' + killed + ' zombies for a score of ' + score + ' points', 10, 20, '#ffffff')
		}
		if (localStorage.getItem('name'))
		{
			if (newHighscore)
			{
				l.text.write('! ! ! NEW HIGH SCORE ! ! !', 10, 35, '#ffffff')
			}
			else
			{
				l.text.write(localStorage.getItem('name') + ' holds the local highscore with ' + localStorage.getItem('highscore') + ' points', 10, 35, '#ffffff')
			}
		}
		l.text.write('GAMEOVER - Press "Enter" to retry', 10, l.entities.camera.height - 10, '#ffffff')
	}
}

function killZombie(bullet, zombie)
{
	l.audio.rewind('kill')
	l.audio.play('kill')

	killed++ // Log the kill

	l.object.delete(bullet)
	for (var i = 0; i < 8; i++)
	{
		l.object.from('giblet', l.entities[zombie].anchor.x, l.entities[zombie].anchor.y)

		l.physics.scatter('giblet' + l.object.latest.giblet, gibletForce)
	}

	var direction = Math.round(l.tool.random(0, 3))

	if (direction == 0)
	{
		l.object.from('zombie', l.canvas.width / 2, 20)
		l.physics.push.down('zombie' + l.object.latest.zombie, respawnForce)
		l.physics.push.right('zombie' + l.object.latest.zombie, l.tool.random(-respawnForce, respawnForce))	
	}
	else if (direction == 1)
	{
		l.object.from('zombie', l.canvas.width / 2, l.canvas.height)
		l.physics.push.up('zombie' + l.object.latest.zombie, respawnForce)
		l.physics.push.right('zombie' + l.object.latest.zombie, l.tool.random(-respawnForce, respawnForce))
	}
	else if (direction == 2)
	{
		l.object.from('zombie', 10, l.canvas.height / 2)
		l.physics.push.right('zombie' + l.object.latest.zombie, respawnForce)
		l.physics.push.up('zombie' + l.object.latest.zombie, l.tool.random(-respawnForce, respawnForce))
	}
	else if (direction == 3)
	{
		l.object.from('zombie', l.canvas.width - 10, l.canvas.height / 2)
		l.physics.push.left('zombie' + l.object.latest.zombie, respawnForce)
		l.physics.push.up('zombie' + l.object.latest.zombie, l.tool.random(-respawnForce, respawnForce))
	}
	
	l.object.delete(zombie)
}

function gameover()
{
	l.audio.rewind('gameover')
	l.audio.play('gameover')

	if (killed)
	{
		score = seconds * killed
	}
	else
	{
		score = seconds
	}

	if (highscore !== 0)
	{
		if (score > highscore)
		{
			newHighscore = true
			highscore = score
			localStorage.setItem('name', prompt('New high score!', 'Name'))
			localStorage.setItem('highscore', highscore)
		}
		else
		{
			newHighscore = false
		}
	}
	else
	{
		highscore = score
	}

	l.game.state = 'gameover'
}