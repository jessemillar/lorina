var colorGround = '#111111'
var colorZombie = '#3D9970'
var colorPlayer = '#FFDC00'
var colorBullet = '#FFFFFF'

l.game.setup(colorGround, true)
l.keyboard.enable()

l.debug.all = false

l.canvas.width = l.canvas.width * 2
l.canvas.height = l.canvas.height * 2

l.physics.friction(2)

var fontFamily = 'minercraftory'
var fontSize = 20
var titleSize = 75
var mathSize = 25
var totalSize = 35
var textPadding = 10

var loadingTextState = 0

var safeZone = 150
var playerSpeed = 7
var playerDirection = 'right'
var bulletForce = 1500
var bulletSideForce = bulletForce / 5
var gibletForce = 100
var gibletLife = 5000
var canShoot = true
var timeShoot = 555
var respawnForce = 300
var zombieCount = l.canvas.width / 25
var zombieSpeed = playerSpeed / 2
var zombieVisionDistance = l.canvas.width / 5
var bulletLife = 1500
var spawned = false

var seconds = 0
var killed = 0
var score = 0
var newHighscore = false

var achievementValues = [200, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
var achievementTitles = ['a n00b', 'a bazookasaur', 'a space cadet', 'one krazy d00d', 'THE d00d', 'a glorious hunter', 'the one', 'Steve Jobs', 'better than everyone', 'a killionaire', 'the special', 'the doge']

if (localStorage.getItem('highscore'))
{
	var highscore = localStorage.getItem('highscore')
}
else
{
	var highscore = 0
}

l.audio.make('song', 'sounds/song.wav')
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

var loadingInterval = setInterval(function()
					{
						if (l.game.state == 'loading')
						{
							if (loadingTextState < 3)
							{
								loadingTextState++
							}
							else
							{
								loadingTextState = 0
							}
						}
						else
						{
							clearInterval(loadingInterval)
						}
					}, 750)

var scoreInterval = setInterval(function()
					{
						if (l.game.state == 'running')
						{
							seconds++
							spawnZombie(2)
						}
					}, 1000)

function game()
{
	if (l.game.state == 'loading')
	{
		var loadingString = null

		l.draw.blank(colorGround)
		l.draw.rectangle(0, 0, l.canvas.width * (l.preloader.percent / 100), l.canvas.height, colorZombie)

		if (loadingTextState == 0)
		{
			loadingString = 'Loading'
		}
		else if (loadingTextState == 1)
		{
			loadingString = 'Loading.'
		}
		else if (loadingTextState == 2)
		{
			loadingString = 'Loading..'
		}
		else if (loadingTextState == 3)
		{
			loadingString = 'Loading...'
		}

		l.write.hud(loadingString, textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorBullet)
	}
	else if (l.game.state == 'menu')
	{
		if (l.keyboard.enter)
		{
			l.audio.loop('song')
			l.game.state = 'running'
		}

		l.draw.blank()
		l.write.hud('Zambies!', l.entities.camera.width / 2, l.entities.camera.height / 2 - titleSize, fontFamily, titleSize, colorPlayer, 'center')
		l.write.hud('[Arrows] to move', l.entities.camera.width / 2, l.entities.camera.height / 2 + fontSize * 2, fontFamily, fontSize, colorZombie, 'center')
		l.write.hud('[Space] to shoot', l.entities.camera.width / 2, l.entities.camera.height / 2 + fontSize * 4, fontFamily, fontSize, colorZombie, 'center')
		l.write.hud('Press [Enter] to start', textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorBullet)
	}
	else if (l.game.state == 'paused')
	{
		if (l.keyboard.enter)
		{
			l.game.state = 'running'
		}

		l.draw.blank(colorGround)
		l.write.hud('PAUSED - Press [Enter] to resume', textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorBullet)
	}
	else if (l.game.state == 'running')
	{
		if (killed) // Update the score
		{
			score = seconds * killed
		}
		else
		{
			score = seconds
		}

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

		if (l.keyboard.space || l.keyboard.a)
		{
			if (canShoot)
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
				killBullet('bullet' + l.object.latest.bullet, bulletLife)

				canShoot = false

				setTimeout(function()
				{
					canShoot = true
				}, timeShoot)
			}
		}

		var thingy = Object.keys(l.entities) // Make this a part of the engine!

		for (var i = 0; i < thingy.length; i++) // Move the zombies
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

		l.write.hud(score, 10, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorBullet)
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
			l.keyboard.clear()
			l.game.state = 'running'
		}

		l.draw.blank(colorGround)

		if (score > 1)
		{
			var pluralPoints = ' points'
		}
		else
		{
			var pluralPoints = ' point'
		}
		l.write.hud(score + pluralPoints, l.entities.camera.width / 2, l.entities.camera.height / 2 - titleSize * 3, fontFamily, totalSize, colorBullet, 'center')

		if (seconds > 1)
		{
			var pluralSeconds = ' seconds'
		}
		else
		{
			var pluralSeconds = ' second'
		}
		if (killed == 1)
		{
			var pluralKilled = ' zombie'
		}
		else
		{
			var pluralKilled = ' zombies'
		}
		l.write.hud(seconds + pluralSeconds + ' survived and ' + killed + pluralKilled + ' killed', l.entities.camera.width / 2, l.entities.camera.height / 2 - titleSize * 2, fontFamily, mathSize, colorZombie, 'center')

		if (score < achievementValues[0])
		{
			var achievement = achievementTitles[0]
		}
		else if (score < achievementValues[1])
		{
			var achievement = achievementTitles[1]
		}
		else if (score < achievementValues[2])
		{
			var achievement = achievementTitles[2]
		}
		else if (score < achievementValues[3])
		{
			var achievement = achievementTitles[3]
		}
		else if (score < achievementValues[4])
		{
			var achievement = achievementTitles[4]
		}
		else if (score < achievementValues[5])
		{
			var achievement = achievementTitles[5]
		}
		else if (score < achievementValues[6])
		{
			var achievement = achievementTitles[6]
		}
		else if (score < achievementValues[7])
		{
			var achievement = achievementTitles[7]
		}
		else if (score < achievementValues[8])
		{
			var achievement = achievementTitles[8]
		}
		else if (score < achievementValues[9])
		{
			var achievement = achievementTitles[9]
		}
		else if (score < achievementValues[10])
		{
			var achievement = achievementTitles[10]
		}
		else if (score < achievementValues[11])
		{
			var achievement = achievementTitles[11]
		}
		else
		{
			var achievement = achievementTitles[11]
		}
		l.write.hud('You are ' + achievement + '!', l.entities.camera.width / 2, l.entities.camera.height / 2 - titleSize, fontFamily, titleSize, colorPlayer, 'center')
		if (localStorage.getItem('name'))
		{
			if (newHighscore)
			{
				l.write.hud('NEW HIGH SCORE', l.entities.camera.width / 2, l.entities.camera.height / 2 + titleSize, fontFamily, fontSize, colorBullet, 'center')
			}
			else
			{
				l.write.hud(localStorage.getItem('name') + ' holds the local highscore with ' + localStorage.getItem('highscore') + ' points', l.entities.camera.width - textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorZombie, 'right')
			}
		}
		l.write.hud('GAMEOVER - Press [Enter] to retry', textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorBullet)
	}
}

function spawnZombie(count)
{
	if (!count)
	{
		count = 1
	}

	for (var i = 0; i < count; i++)
	{
		var direction = Math.round(l.tool.random(0, 3))

		if (direction == 0)
		{
			l.object.from('zombie', l.tool.random(20, l.canvas.width - 20), 20)
			l.physics.push.down('zombie' + l.object.latest.zombie, respawnForce)
			l.physics.push.right('zombie' + l.object.latest.zombie, l.tool.random(-respawnForce, respawnForce))	
		}
		else if (direction == 1)
		{
			l.object.from('zombie', l.tool.random(20, l.canvas.width - 20), l.canvas.height)
			l.physics.push.up('zombie' + l.object.latest.zombie, respawnForce)
			l.physics.push.right('zombie' + l.object.latest.zombie, l.tool.random(-respawnForce, respawnForce))
		}
		else if (direction == 2)
		{
			l.object.from('zombie', 10, l.tool.random(20, l.canvas.height - 20))
			l.physics.push.right('zombie' + l.object.latest.zombie, respawnForce)
			l.physics.push.up('zombie' + l.object.latest.zombie, l.tool.random(-respawnForce, respawnForce))
		}
		else if (direction == 3)
		{
			l.object.from('zombie', l.canvas.width - 10, l.tool.random(20, l.canvas.height - 20))
			l.physics.push.left('zombie' + l.object.latest.zombie, respawnForce)
			l.physics.push.up('zombie' + l.object.latest.zombie, l.tool.random(-respawnForce, respawnForce))
		}
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
		killGiblet('giblet' + l.object.latest.giblet, l.tool.random(gibletLife / 2, gibletLife))
	}
	
	l.object.delete(zombie)

	spawnZombie() // Let's make the whole survival thing hopeless, shall we?
}

function killGiblet(giblet, time)
{
	setTimeout(function()
	{
		l.object.delete(giblet)
	}, time)
}

function killBullet(bullet, time)
{
	setTimeout(function()
	{
		if (l.entities[bullet])
		{
			l.object.delete(bullet)
		}
	}, time)
}

function gameover()
{
	l.audio.rewind('gameover')
	l.audio.play('gameover')

	if (highscore !== 0)
	{
		if (score > highscore)
		{
			newHighscore = true
			highscore = score
			localStorage.setItem('name', prompt('New high score!', ''))
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