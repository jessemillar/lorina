var Accelerometer = function()
{
	var self = this

	this.x = 0
	this.y = 0
	this.z = 0

	this.rotation = {x: 0, y: 0, z: 0}

	window.ondeviceorientation = function(event) // Gyroscope for tilt
	{
		self.x = event.beta
		self.y = event.gamma
		self.z = event.alpha
	}

	window.ondevicemotion = function(event) // Accelerometer for rotation acceleration
	{
		var rotation = event.rotationRate

		self.rotation.x = rotation.alpha
		self.rotation.y = rotation.beta
		self.rotation.z = rotation.gamma
	}

	this.debug = function()
	{
		console.log(Math.round(this.x), Math.round(this.y), Math.round(this.z), Math.round(this.rotation.x), Math.round(this.rotation.y), Math.round(this.rotation.z))

		return this
	}
}