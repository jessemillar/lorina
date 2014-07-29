var Cupboard = function()
{
	if (typeof(Storage) == 'undefined')
	{
		console.log('This browser does not support localStorage')
	}

	this.set = function(key, value, temp)
	{
		var tempValue

		if (typeof value == 'object')
		{
			tempValue = JSON.stringify(value)
		}
		else
		{
			tempValue = value
		}

		if (temp)
		{
			sessionStorage.setItem(key, tempValue)
		}
		else
		{
			localStorage.setItem(key, tempValue)
		}

		return true
	}

	this.get = function(key, temp)
	{
		if (temp)
		{
			if (sessionStorage.getItem(key))
			{
				return JSON.parse(sessionStorage.getItem(key))
			}
			else
			{
				return undefined
			}
		}
		else
		{
			if (localStorage.getItem(key))
			{
				return JSON.parse(localStorage.getItem(key))
			}
			else
			{
				return undefined
			}
		}
		
	}

	this.delete = function(key, temp)
	{
		if (temp)
		{
			if (sessionStorage.getItem(key))
			{
				sessionStorage.removeItem(key)

				return true
			}
			else
			{
				return false
			}
		}
		else
		{
			if (localStorage.getItem(key))
			{
				localStorage.removeItem(key)

				return true
			}
			else
			{
				return false
			}
		}
	}
}