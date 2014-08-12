var game = new Lorina()
	game.setTitle('checkDrag')
		.setColor('#dddddd')
		.makeFullscreen()
		.appendCanvas()

var mouse = new Mouse()

var thingy = new Entity()
	thingy.setSprite('test.png', true, true)
		  .setPosition(10, 10)

var main = function()
{
	mouse.checkDrag(thingy)

	game.blank()

	thingy.draw().debug()

	game.draw()
}

game.start(main)