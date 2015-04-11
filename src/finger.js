var finger = new function() {
	this.touching = false
	this.x = undefined
	this.y = undefined
	this.database = new Array() // Keep track of where we're touching on the screen

	var self = this

	l.dom.addEventListener('touchstart', function(event) { self.touches(event) }, false)
	l.dom.addEventListener('touchmove', function(event) { self.touches(event) }, false)
	l.dom.addEventListener('touchend', function() { self.clearTouches() }, false)
	l.dom.addEventListener('touchcancel', function() { self.clearTouches() }, false)

	this.touches = function(event)
	{
		this.touching = true
		this.x = event.touches[0].clientX
		this.y = event.touches[0].clientY
		this.database = event.touches
	}

	this.clearTouches = function()
	{
		this.touching = false
		this.x = undefined
		this.y = undefined
		this.database.length = 0
	}

	this.checkTouched = function(entity)
	{
		if (this.database.length > 0)
		{
			var i = this.database.length

			while (i--)
			{
				if (this.x < entity.x + entity.bound.x + entity.bound.width && this.x > entity.x + entity.bound.x && this.y < entity.y + entity.bound.y + entity.bound.height && this.y > entity.y + entity.bound.y)
				{
					return true
				}
				else
				{
					if (i == this.database.length - 1)
					{
						return false
					}
				}
			}
		}
	}
}