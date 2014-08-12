var game = new Lorina()
	game.setTitle('Map Drawing')
		.setColor('#FF0000')
		.makeFullscreen()
		.appendCanvas()

var cartographer = new Cartographer()
	cartographer.setMap(tutorial)

var main = function() // This is our 'game' screen that's run by the preloader
{
	game.blank() // Blank the screen with the color set in l.game.setup before drawing
	cartographer.draw(tutorial)
}

game.start(main)