var Geolocator = function()
{
    var self = this

    this.latitude = 0
    this.longitude = 0
    this.compass = 0

    window.addEventListener('deviceorientation', function(event)
    {
        self.x = event.beta
        self.y = event.gamma
        self.z = event.alpha
    }, true)
}