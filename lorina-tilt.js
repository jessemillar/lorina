l.tilt = new Object()

l.tilt.x = 0
l.tilt.y = 0
l.tilt.z = 0

l.tilt.enable = function()
{
    document.addEventListener('deviceorientation', function(orientation)
    {
        l.tilt.x = orientation.beta
        l.tilt.y = orientation.alpha
        l.tilt.z = orientation.gamma
        l.tilt.debug()
    }, true)
}

l.tilt.debug = function()
{
	if (l.debug.tilt)
	{
		console.log('x: ' + l.tilt.x + ' y: ' + l.tilt.y + ' z: ' + l.tilt.z)
	}
}