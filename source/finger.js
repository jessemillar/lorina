var Finger = function()
{
	this.database = new Array() // Keep track of where we're touching on the screen

	var self = this

	document.touchstart = function(event) {self.touches(event)}
	document.touchmove = function(event) {self.touches(event)}
	document.touchend = function(event) {self.touches(event)}
	document.touchcancel = function(event) {self.touches(event)}

	this.touches = function(event)
	{
		if (event)
		{
			this.database = event.touches
		}
		else
		{
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