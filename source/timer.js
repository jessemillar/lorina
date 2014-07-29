var Timer = function()
{
	this.start = function()
	{
		this.time = new Date()

		return this
	}

	this.clear = function()
	{
		this.time = undefined

		return this
	}

	this.check = function()
	{
		if (this.time)
		{
			var now = new Date()

			return now.getTime() - this.time.getTime()
		}
		else
		{
			return 0
		}
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