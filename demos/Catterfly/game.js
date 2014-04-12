var butterflyCount = 200
var butterflyForce = 2

var game = new Lorina()
	game.setColor('#7FDBFF')
		.makeFullscreen()

var tool = new Tool()

var butterflies = new Group()

var i = butterflyCount

while (i--)
{
	var entity = 'butterfly' + i

	var entity = new Entity()
		entity.setSprite('images/butterfly.png')
			  .setPosition(tool.random(0, l.canvas.width), tool.random(0, l.canvas.height))
			  .setAnchor(25, 25)
			  .setSize(50, 50)
			  .setAnimation(2, tool.random(100, 300))
			  .setFriction(0)
			  .scatter(butterflyForce)
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
	butterflies.updatePhysics().bounce()

	game.blank()
	butterflies.buffer()
	game.draw()

	// butterflies.debug()
}

game.start(loading) // Only call once the room functions are defined