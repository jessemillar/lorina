var butterflyCount = 3

var game = new Lorina()
	game.setColor('#7FDBFF')
		.makeFullscreen()

var measure = new Measure()

var butterflies = new Group()

var butterfly = new Loader()
	butterfly.setSprite('images/butterfly.png')

var i = butterflyCount

while (i--)
{
	var entity = 'butterfly' + i

	var entity = new Entity()
		entity.copy(butterfly)
			  .setPosition(measure.random(0, l.canvas.width), measure.random(0, l.canvas.height))
			  .setAnchor(25, 25)
			  .setAnimation(2, measure.random(10, 2000))
		butterflies.add(entity)
}

// I would recommend that you keep the data for your room functions in an external file and reference it here
var loading = function()
{
	if (l.loaded)
	{
		game.setRoom(main)
	}

	game.blank('#FF0000')
}

var main = function()
{
	game.blank()
	butterflies.buffer()
	game.draw()
}

game.start(loading) // Only call once the room functions are defined