var Mouse = function()
{
	var self = this

	document.onmouseout = function() {self.mouseOut()}
	document.onmousemove = function() {self.update()}
	l.dom.onmousedown = function() {self.clicked()}
	l.dom.oncontextmenu = function() {event.preventDefault()}
	l.dom.onmouseup = function() {self.cancel()}

	this.update = function()
	{
		this.x = event.clientX - l.dom.offsetLeft + l.camera.x
		this.y = event.clientY - l.dom.offsetTop + l.camera.y
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

	this.cancel = function()
	{
		this.leftClick = false
		this.rightClick = false
	}
}