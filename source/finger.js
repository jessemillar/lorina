var Finger = function()
{
	this.x = undefined
	this.y = undefined
	this.database = new Array() // Keep track of where we're touching on the screen

	var self = this

	l.dom.addEventListener('touchstart', self.touches, false)
	l.dom.addEventListener('touchmove', self.touches, false)
	l.dom.addEventListener('touchend', self.touches, false)
	l.dom.addEventListener('touchcancel', self.touches, false)

	this.touches = function(event)
	{
		if (event)
		{
			this.x = event.touches[0].clientX
			this.y = event.touches[0].clientY
			this.database = event.touches
		}
		else
		{
			this.x = undefined
			this.y = undefined
			this.database.length = 0
		}
	}

	this.checkTouched = function(entity)
	{
		if (this.database.length > 0)
		{
			var i = this.database.length

			while (i--)
			{
				if (this.database[i].pageX < entity.bound.x + entity.bound.width && this.database[i].pageX > entity.bound.x &&
				this.database[i].pageY < entity.bound.y + entity.bound.height && this.database[i].pageY > entity.bound.y)
				{
					return true
					break
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