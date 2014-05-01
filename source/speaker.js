var Speaker = function()
{
    this.file = new Audio()

    this.setFile = function(location)
    {
        this.file.src = location
        
        return this
    }

    this.pause = function()
    {
        this.file.pause()

        return this
    }

    this.play = function()
    {
        this.file.play()

        var self = this

        this.file.onended = function()
        {
            self.file.currentTime = 0
        }

        return this
    }

    this.loop = function()
    {
        this.file.loop = true
        this.file.play()

        return this
    }
}