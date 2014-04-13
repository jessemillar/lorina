var Mouse = function()
{
	var self = this

	document.onmouseout = function() {self.null()}
	document.onmousemove = function() {self.moved(event)}
	l.dom.onmousedown = function() {self.clicked(event)}
	l.dom.onmouseup = function() {self.cancel()}

	this.clicked = {x: null, y: null}

	this.moved = function(event)
	{
		if (event)
		{
			this.x = event.clientX + l.camera.x
			this.y = event.clientY + l.camera.y
		}
	}

	this.null = function()
	{
		self.x = null
		self.y = null
	}

	this.clicked = function(event)
	{
		if (event)
		{
			this.clicked.x = event.x - l.dom.offsetLeft
			this.clicked.y = event.y - l.dom.offsetTop
		}
	}

	this.cancel = function(event)
	{
		this.clicked.x = null
		this.clicked.y = null
	}
}