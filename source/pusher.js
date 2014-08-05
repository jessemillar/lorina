var Pusher = function() // Support for CocoonJS local push notifications
{
	this.register = function()
	{
		if (typeof CocoonJS !== 'undefined')
		{
			CocoonJS.Notification.registerForPushNotifications()
		}
		else
		{
			console.error('CocoonJS not supported by this browser')
		}

		return this
	}

	this.unregister = function()
	{
		if (typeof CocoonJS !== 'undefined')
		{
			CocoonJS.Notification.unregisterForPushNotifications()
		}
		else
		{
			console.error('CocoonJS not supported by this browser')
		}

		return this
	}

	this.notify = function(message, scheduledFor) // scheduledFor is a time in milliseconds from 1970
	{
		if (typeof CocoonJS !== 'undefined')
		{
			var time = 0

			if (!scheduledFor)
			{
				var date = new Date()
				time = Date.parse(date)
			}
			else
			{
				time = scheduledFor
			}

			var localNotification = {
				message: message,
				scheduleTime: time
			}

			CocoonJS.Notification.sendLocalNotification(localNotification)
		}
		else
		{
			console.error('CocoonJS not supported by this browser')
		}
	}
}