var mouse = new function() {
	var self = this

	document.onmouseout = function() {self.mouseOut()}
	document.onmousemove = function() {self.update()}
	l.dom.onmousedown = function() {self.clicked()}
	l.dom.oncontextmenu = function() {event.preventDefault()}
	l.dom.onmouseup = function() {self.cancel()}

	this.update = function()
	{
		this.actualX = event.clientX - l.dom.offsetLeft
		this.actualY = event.clientY - l.dom.offsetTop

		this.calculate()
	}

	this.calculate = function()
	{
		this.x = this.actualX + l.camera.x
		this.y = this.actualY + l.camera.y
	}

	this.mouseOut = function()
	{
		this.x = null
		this.y = null
	}

	this.clicked = function()
	{		
		if (event.which == 1)
		{
			this.leftClick = true
		}
		else if (event.which == 2)
		{
			this.middleClick = true
		}
		else if (event.which == 3)
		{
			this.rightClick = true

			event.preventDefault()
		}
	}

		this.checkLeftClicked = function(entity)
		{
			if (this.leftClick && this.x < entity.x + entity.bound.x + entity.bound.width && this.x > entity.x + entity.bound.x &&
			this.y < entity.y + entity.bound.y + entity.bound.height && this.y > entity.y + entity.bound.y)
			{
				return true
			}
			else
			{
				return false
			}
		}

			var xDifference = undefined
			var yDifference = undefined
			var dragging = false

			this.checkDrag = function(entity) // Only works with left click for now
			{
				if (this.checkLeftClicked(entity))
				{
					dragging = true
				}
				else if (!mouse.leftClick)
				{
					xDifference = undefined
					yDifference = undefined
					dragging = false
				}

				if (dragging)
				{
					if (xDifference && yDifference)
					{
						entity.x = mouse.x - xDifference
						entity.y = mouse.y - yDifference
					}

					if (!xDifference && !yDifference)
					{
						xDifference = mouse.x - entity.x
						yDifference = mouse.y - entity.y
					}
				}

				return this
			}

		this.checkMiddleClicked = function(entity)
		{
			if (this.middleClick && this.x < entity.x + entity.bound.x + entity.bound.width && this.x > entity.x + entity.bound.x &&
			this.y < entity.y + entity.bound.y + entity.bound.height && this.y > entity.y + entity.bound.y)
			{
				return true
			}
			else
			{
				return false
			}
		}

		this.checkRightClicked = function(entity)
		{
			if (this.rightClick && this.x < entity.x + entity.bound.x + entity.bound.width && this.x > entity.x + entity.bound.x &&
			this.y < entity.y + entity.bound.y + entity.bound.height && this.y > entity.y + entity.bound.y)
			{
				return true
			}
			else
			{
				return false
			}
		}

	this.cancel = function()
	{
		if (event.which == 1)
		{
			this.leftClick = false
		}
		else if (event.which == 2)
		{
			this.middleClick = false
		}
		else if (event.which == 3)
		{
			this.rightClick = false

			event.preventDefault()
		}
	}
}