var Timer = function()
{
	this.log = function()
	{
		this.time = new Date()

		return this
	}

	this.check = function(timer)
	{
		var now = new Date()

		return now.getTime() - timer.time.getTime()
	}

	this.compareTo = function(other)
	{
		if (other.time)
		{
			if (this.time.getTime() > other.time.getTime())
			{
				var difference = this.time.getTime() - other.time.getTime()
			}
			else
			{
				var difference = other.time.getTime() - this.time.getTime()
			}

			return difference
		}
		else
		{
			return 0
		}
	}
}