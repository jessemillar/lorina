var Speaker = function()
{
    var database = new Array()

    this.load = function(name, location)
    {
        var file = new Audio()
            file.name = name
            file.src = location

        database.push(file)
        
        return this
    }

    this.pause = function(name)
    {
        var i = database.length
        while (i--)
        {
            if (database[i].name == name)
            {
                database[i].pause()
                break
            }
        }

        return this
    }

    this.play = function(name)
    {
        var i = database.length
        while (i--)
        {
            if (database[i].name == name)
            {
                database[i].play()
                break
            }
        }

        return this
    }
}