lorina.setTitle('Clipper')
	  .setColor('#dddddd')
	  .appendCanvas()

var map = new Entity()
	map.setSprite('terrain.png', true, true)
	   .setPosition(0, 0)

var main = function()
{
	lorina.blank()

	scissors.mark(50, 50, 100, 50)
	map.draw()
	scissors.cut()

	lorina.draw()
}

lorina.start(main)