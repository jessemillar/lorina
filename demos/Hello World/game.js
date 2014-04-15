l.game.setup('#FF0000', false, false, true) // Start the game engine and set the default blank color

l.game.start('game') // Tell the preloader to load everything and then go to the 'game' screen

l.screen.game = function() // This is our 'game' screen that's run by the preloader
{
	l.draw.blank() // Blank the screen with the color set in l.game.setup before drawing
	l.write.hud('Hello, World', 50, 50, 'Helvetica', 30, '#FFFFFF') // Write 'Hello, World' to the screen
}