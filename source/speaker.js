var Speaker = function()
{
    this.file = new Audio()

    this.setFile = function(location)
    {
        this.file.oncanplaythrough = function()
        {
            l.preloader.subtract()
        }

        this.file.src = location
        
        l.preloader.add()

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

        return this
    }

    this.loop = function()
    {
        this.file.loop = true
        this.file.play()

        return this
    }
}