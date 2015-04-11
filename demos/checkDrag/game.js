lorina.setTitle('checkDrag')
	  .setColor('#dddddd')
	  .makeFullscreen()
	  .appendCanvas()

var thingy = new Entity()
	thingy.setSprite('test.png', true, true)
		  .setPosition(10, 10)

var main = function()
{
	mouse.checkDrag(thingy)

	lorina.blank()

	thingy.draw()

	lorina.draw()
}

lorina.start(main)