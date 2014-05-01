var tutorial = {
	tileset: {count: 5, image: 'images/tileset.png'},
	layout: {width: 10, data: [
		1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,
		1,0,0,0,0,0,0,0,0,1,
		1,1,1,1,1,1,1,1,1,1
	]}
}

var game = new Lorina()
	game.setTitle('Map Drawing')
		.setColor('#FF0000')
		.makeFullscreen()

var cartographer = new Cartographer()
	cartographer.loadMap(tutorial)

var main = function() // This is our 'game' screen that's run by the preloader
{
	game.blank() // Blank the screen with the color set in l.game.setup before drawing
	cartographer.drawMap(tutorial)
}

game.start(main)