var Speaker = function()
{
    var file = new Audio()

    this.setFile = function(location)
    {
        file.src = location
        
        return this
    }

    this.pause = function()
    {
        file.pause()

        return this
    }

    this.play = function()
    {
        file.play()

        var self = this

        file.onended = function()
        {
            self.file.currentTime = 0
        }

        return this
    }

    this.loop = function()
    {
        file.loop = true
        file.play()

        return this
    }
}