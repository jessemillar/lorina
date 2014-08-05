var l = new Object()

var Lorina = function()
{
	var self = this
	
	l.dom = document.getElementById('canvas')
	l.ctx = l.dom.getContext('2d')
	l.room = new Object()
	l.buffer = new Array() // For z-sorting
	l.camera = {state: 'resting', x: 0, y: 0, previous: {x: 0, y: 0}, sandbox: {width: 1, height: 1}}

	l.retina = window.devicePixelRatio // 1 if not retina and 2 if yes

	// Put the sizing function above where we use it to set the default canvas size
	this.setRoomSize = function(width, height)
	{
		l.room.width = width
		l.room.height = height
		
		return this
	}

	this.setDomSize = function(width, height)
	{
		l.dom.width = width
		l.dom.height = height

		return this
	}

	this.setDomPosition = function(x, y)
	{
		l.dom.style.position = 'absolute'
		l.dom.style.left = x + 'px'
		l.dom.style.top = y + 'px'

		return this
	}

		this.setRoomSize(256, 224) // I'm so clever for using the SNES's resolution as the default canvas size
		this.setDomSize(256, 224)

	this.setTitle = function(title)
	{
		document.title = title

		return this
	}

	this.scale = function(scale)
	{
		l.ctx.imageSmoothingEnabled = false
		l.ctx.scale(scale / 100, scale / 100)

		return this
	}

	this.makeFullscreen = function()
	{	
		document.body.style.background = this.color // Helps with some refresh problems caused by scaling the window

		/*
		window.onresize = function()
		{
			self.setFullscreen()
		}
		*/

		this.setFullscreen()

		return this
	}

		this.setFullscreen = function() // Engine only
		{
			self.setDomPosition(0, 0)
			self.setDomSize(window.innerWidth, window.innerHeight)
			self.setRoomSize(l.dom.width, l.dom.height)
		}

	this.hideCursor = function()
	{
		l.dom.style.cursor = 'none'

		return this
	}

	this.start = function(room)
	{
		this.setRoom(room)

		return this
	}

	this.stop = function()
	{
		clearInterval(this.loop)

		return this
	}

	this.setRoom = function(room)
	{
		l.room.current = room

		window.requestAnimationFrame(room)

		return this
	}

	this.setColor = function(color) // I find that I don't use this very often
	{
		this.color = color

		return this
	}

	this.blank = function(color)
	{
		if (color)
		{
			l.ctx.fillStyle = color
		}
		else
		{
			l.ctx.fillStyle = this.color
		}

		l.ctx.fillRect(0, 0, l.dom.width, l.dom.height)

		l.buffer.length = 0 // Wipe the z-buffer for the next pass

		return this
	}

	this.draw = function()
	{
		l.buffer.sort(function(a, b)
		{
			return a.y - b.y
		})

		var i = l.buffer.length

		while (i--)
		{
			l.buffer[i].draw()
		}

		window.requestAnimationFrame(l.room.current)

		return this
	}
}