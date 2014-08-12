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

        return this
    }

    this.loop = function()
    {
        file.loop = true
        file.play()

        return this
    }
}