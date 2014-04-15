var Tool = function()
{
    this.random = function(min, max)
    {
        return Math.random() * (max - min) + min
    }

    this.measureX = function(a, b)
    {
    	return Math.abs(a.x - b.x)
    }

    this.measureY = function(a, b)
    {
    	return Math.abs(a.y - b.y)
    }

    this.measureDistance = function(a, b)
    {
    	var x = this.measureX(a, b)
    	var y = this.measureY(a, b)

    	return Math.sqrt(x * x + y * y)
    }

    this.measureAngle = function(a, b)
    {
        var x = b.x - a.x
        var y = a.y - b.y

        var angle = Math.atan(y / x) * 180 / Math.PI

        if (x < 0)
        {
            angle += 180
        }
        else if (x > 0 && y < 0)
        {
            angle += 360
        }

        return angle
    }
}