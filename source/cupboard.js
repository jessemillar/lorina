var Cupboard = function()
{
	if (typeof(Storage) == 'undefined')
	{
		console.log('This browser does not support localStorage')
	}

	this.save = function(key, value, temp)
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
				try
				{
					return JSON.parse(sessionStorage.getItem(key))
				}
				catch(err)
				{
					return sessionStorage.getItem(key)
				}
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
				try
				{
					return JSON.parse(localStorage.getItem(key))
				}
				catch(err)
				{
					return localStorage.getItem(key)
				}
			}
			else
			{
				return undefined
			}
		}	
	}

		this.load = function(key, global, temp)
		{
			if (this.get(key, temp))
			{
				if (global)
				{
					global[key] = this.get(key, temp)
				}
				else
				{
					window[key] = this.get(key, temp)
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

	this.clear = function(temp)
	{
		if (temp)
		{
			sessionStorage.clear()

			return true
		}
		else
		{
			localStorage.clear()

			return true
		}
	}
}