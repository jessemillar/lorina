var Timer = function()
{
	this.log = function()
	{
		this.time = new Date()

		return this
	}

	this.compareTo = function(other)
	{
		if (Date.parse(this.time) > Date.parse(other.time))
		{
			var difference = Date.parse(this.time) - Date.parse(other.time)
		}
		else
		{
			var difference = Date.parse(other.time) - Date.parse(this.time)
		}

		return difference / 1000
	}
}