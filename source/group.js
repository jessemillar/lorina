var Group = function()
{
    this.database = new Array()

    this.add = function(entity)
    {
        this.database.push(entity)
    }

    this.remove = function(entity)
    {
        var i = this.database.length

        while (i--)
        {
            if (this.database[i] == entity)
            {
                this.database.splice(i, 1)
                break
            }
        }
    }
}