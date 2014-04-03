var Lorina = function()
{
    this.setup = function(color, gamecenter, ads)
    {
        this.color = color

        if (gamecenter)
        {
            this.gamecenter = true
        }

        if (ads)
        {
            this.ads = true
        }

        this.dom = document.getElementById('canvas')
        this.ctx = document.getElementById('canvas').getContext('2d')
        
        return this
    }

    this.fullscreen = function()
    {
        if (window.navigator.vendor) // Check if we're using a non-Ejecta browser
        {
            document.body.setAttribute('onresize', 'this.fullscreen()')
        }

        document.body.style.background = gameColor

        this.dom.style.position = 'absolute'
        this.dom.style.left = '0px'
        this.dom.style.top = '0px'
        this.dom.width = window.innerWidth
        this.dom.height = window.innerHeight

        return this
    }

    this.start = function(room)
    {
        this.room(room)

        return this
    }

    this.stop = function()
    {
        clearInterval(this.loop)

        return this
    }

    this.room = function(room)
    {
        clearInterval(this.loop)
        this.loop = setInterval(room, 1000 / 60)

        return this
    }
}

/*
this.camera = new Object() // Group the camera functions

this.camera.follow = function(name, sandboxWidth, sandboxHeight)
{
    if (!this.entities.camera.shaking)
    {
        this.entities.camera.following = true // Tell the world that we're following something with the camera
		
        if (sandboxWidth)
        {
            if (this.entities[name].anchor.x < this.entities.camera.x + this.entities.camera.width / 2 - sandboxWidth / 2)
            {
                this.entities.camera.x = Math.round(this.entities[name].anchor.x - this.entities.camera.width / 2 + sandboxWidth / 2)
            }
            else if (this.entities[name].anchor.x > this.entities.camera.x + this.entities.camera.width / 2 + sandboxWidth / 2)
            {
                this.entities.camera.x = Math.round(this.entities[name].anchor.x - this.entities.camera.width / 2 - sandboxWidth / 2)
            }
        }
		
        if (sandboxHeight)
        {
            if (this.entities[name].anchor.y < this.entities.camera.y + this.entities.camera.height / 2 - sandboxHeight / 2)
            {
                this.entities.camera.y = Math.round(this.entities[name].anchor.y - this.entities.camera.height / 2 + sandboxHeight / 2)
            }
            else if (this.entities[name].anchor.y > this.entities.camera.y + this.entities.camera.height / 2 + sandboxHeight / 2)
            {
                this.entities.camera.y = Math.round(this.entities[name].anchor.y - this.entities.camera.height / 2 - sandboxHeight / 2)
            }
        }
		
        if (this.entities.camera.x < 0)
        {
            this.entities.camera.x = 0
        }
        else if (this.entities.camera.x > this.canvas.width - this.entities.camera.width)
        {
            this.entities.camera.x = this.canvas.width - this.entities.camera.width
        }
		
        if (this.entities.camera.y < 0)
        {
            this.entities.camera.y = 0
        }
        else if (this.entities.camera.y > this.canvas.height - this.entities.camera.height)
        {
            this.entities.camera.y = this.canvas.height - this.entities.camera.height
        }
    }
}

this.camera.reset = function()
{
    this.entities.camera.x = 0
    this.entities.camera.y = 0
}

this.camera.shake = function(shakes, duration, severity)
{
    if (this.entities.camera.following)
    {
        this.entities.camera.shaking = true // Tell the "following" function that we're shaking
    }
	
    // "Back up" the camera's position
    this.entities.camera.previous.x = this.entities.camera.x
    this.entities.camera.previous.y = this.entities.camera.y
	
    var timing = duration / (shakes * 2)
	
    for (var i = 0; i < shakes * 2; i++)
    {
        if (i % 2 == 0)
        {
            setTimeout(function() // Set the timeout that will reset the camera back to its proper position
					   {
					   this.entities.camera.x = this.entities.camera.previous.x
					   this.entities.camera.y = this.entities.camera.previous.y
					   }, timing * i)
        }
        else
        {
            setTimeout(function()
					   {
					   var xMovement = Math.round(this.tools.random(0 - severity / 2, severity / 2))
					   var yMovement = Math.round(this.tools.random(0 - severity / 2, severity / 2))
					   
					   if (xMovement > 0)
					   {
					   if (this.entities.camera.x + xMovement < this.canvas.width - this.entities.camera.width)
					   {
					   this.entities.camera.x += xMovement
					   }
					   }
					   else
					   {
					   if (this.entities.camera.x - Math.abs(xMovement) > 0)
					   {
					   this.entities.camera.x = this.entities.camera.x - Math.abs(xMovement)
					   }
					   }
					   
					   if (yMovement > 0)
					   {
					   if (this.entities.camera.y + yMovement < this.canvas.height - this.entities.camera.height)
					   {
					   this.entities.camera.y += yMovement
					   }
					   }
					   else
					   {
					   if (this.entities.camera.y - Math.abs(yMovement) > 0)
					   {
					   this.entities.camera.y -= Math.abs(yMovement)
					   }
					   }
					   }, timing * i)
        }
    }
	
    setTimeout(function()
			   {
			   if (this.entities.camera.following)
			   {
			   this.entities.camera.shaking = false // Tell the following function that we're done shaking
			   }
			   }, duration)
}
*/