var Accelerometer = function()
{
    this.x = 0
    this.y = 0
    this.z = 0

    document.addEventListener('deviceorientation', function(orientation)
    {
        this.x = orientation.beta
        this.y = orientation.alpha
        this.z = orientation.gamma
    }, true)
}