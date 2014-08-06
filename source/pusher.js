var Pusher = function() // Support for CocoonJS local push notifications
{
	this.register = function()
	{
		CocoonJS.Notification.registerForPushNotifications()

		return this
	}

	this.unregister = function()
	{
		CocoonJS.Notification.unregisterForPushNotifications()

		return this
	}

	this.notify = function(message, delay) // Delay is in seconds
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