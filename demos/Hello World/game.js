var game = new Lorina()
	game.setColor('#FF0000')
		.makeFullscreen()

var typewriter = new Typewriter()
	typewriter.setFont('Helvetica')
			  .setAlignment('center')
			  .setSize(30)
			  .setColor('#FFFFFF')

var main = function() // This is our 'game' screen that's run by the preloader
{
	game.blank() // Blank the screen with the color set in l.game.setup before drawing
	typewriter.setPosition(l.room.width / 2, l.room.height / 2).write('Hello, World') // Write 'Hello, World' to the screen
}

game.start(main)