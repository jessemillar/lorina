var Pusher = function() // Support for CocoonJS local push notifications
{
	this.registered = false

	this.register = function()
	{
		CocoonJS.Notification.registerForPushNotifications()

		this.registered = true

		return this
	}

	this.unregister = function()
	{
		CocoonJS.Notification.unregisterForPushNotifications()

		this.registered = false

		return this
	}

	this.notify = function(message, delay) // Delay is in seconds
	{
		if (this.registered)
		{
			var sound = true
			var badge = 0
			var userData = {item: 0}

			var scheduleTime = new Date().getTime() + delay * 1000

			var localNotification = CocoonJS.Notification.createLocalNotification( 
				message,
				sound,
				badge,
				userData,
				'This is the local notification body',
				'Local notification title',
				scheduleTime
			)

	        CocoonJS.Notification.sendLocalNotification(localNotification)
		}
	}

	this.cancel = function() // Cancels all local notifications because I'm too lazy to figure out how to cancel just one
	{
		CocoonJS.Notification.cancelAllLocalNotifications()
	}
}