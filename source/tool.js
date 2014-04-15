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

    this.measure = function(a, b)
    {
    	var x = this.measureX(a, b)
    	var y = this.measureY(a, b)

    	return Math.sqrt(x * x + y * y)
    }
}