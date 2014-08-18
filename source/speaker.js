var Speaker = function()
{
    var database = new Array()
    var stack = new Array() // For stacking sound effects

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
                // Push to and play from stack
                var file = new Audio()
                    file.name = database[i].name
                    file.src = database[i].src

                stack.push(file)
                stack[stack.length - 1].play()

                break
            }
        }

        return this
    }
}