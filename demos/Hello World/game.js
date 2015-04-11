lorina.setTitle('Hello, World')
	  .setColor('#FF0000')
	  .makeFullscreen()
	  .appendCanvas() // Actually add the canvas to the page after setting its values

typewriter.setFont('Helvetica')
		  .setAlignment('center')
		  .setSize(30)
		  .setColor('#FFFFFF')

var main = function()
{
	lorina.blank() // Blank the screen with the color set in l.game.setup before drawing
	typewriter.setPosition(l.room.width / 2, l.room.height / 2).write('Hello, World') // Write 'Hello, World' in the middle of the screen
}

lorina.start(main)