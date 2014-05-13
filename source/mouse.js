var Mouse = function()
{
	l.mouse = this

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
			if (this.leftClick && this.x < entity.bound.x + entity.bound.width && this.x > entity.bound.x &&
			this.y < entity.bound.y + entity.bound.height && this.y > entity.bound.y)
			{
				return true
			}
			else
			{
				return false
			}
		}

		this.checkMiddleClicked = function(entity)
		{
			if (this.middleClick && this.x < entity.bound.x + entity.bound.width && this.x > entity.bound.x &&
			this.y < entity.bound.y + entity.bound.height && this.y > entity.bound.y)
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
			if (this.rightClick && this.x < entity.bound.x + entity.bound.width && this.x > entity.bound.x &&
			this.y < entity.bound.y + entity.bound.height && this.y > entity.bound.y)
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