var Mouse = function()
{
	var self = this

	document.onmouseout = function() {self.mouseOut()}
	document.onmousemove = function() {self.move(event)}
	l.dom.onmousedown = function() {self.clicked(event)}
	l.dom.onmouseup = function() {self.cancel()}

	this.move = function(event)
	{
		if (event)
		{
			this.x = event.clientX + l.camera.x
			this.y = event.clientY + l.camera.y
		}
	}

	this.mouseOut = function()
	{
		this.x = null
		this.y = null
	}

	this.clicked = function(event)
	{
		this.click = true
	}

	this.cancel = function(event)
	{
		this.click = false
	}
}