var game = new Lorina()
	game.setTitle('Hello, World')
		.setColor('#FF0000')
		.makeFullscreen()
		.appendCanvas() // Actually add the canvas to the page after setting its values

var typewriter = new Typewriter()
	typewriter.setFont('Helvetica')
			  .setAlignment('center')
			  .setSize(30)
			  .setColor('#FFFFFF')

var main = function()
{
	game.blank() // Blank the screen with the color set in l.game.setup before drawing
	typewriter.setPosition(l.room.width / 2, l.room.height / 2).write('Hello, World') // Write 'Hello, World' in the middle of the screen
}

game.start(main)