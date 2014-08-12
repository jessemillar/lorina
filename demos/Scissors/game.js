var game = new Lorina()
	game.setTitle('Clipper')
		.setColor('#dddddd')
		.appendCanvas()

var scissors = new Scissors()

var map = new Entity()
	map.setSprite('terrain.png', true, true)
		.setPosition(0, 0)

var main = function()
{
	game.blank()

	scissors.mark(50, 50, 100, 50)
	map.draw()
	scissors.cut()

	game.draw()
}

game.start(main)