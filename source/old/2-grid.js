l.grid = new Object()
l.grid.database = new Object()

l.grid.make = function(width, height, size)
{
    l.grid.width = width
    l.grid.height = height

    for (var y = 0; y < l.grid.height + 1; y++)
    {
        for (var x = 0; x < l.grid.width + 1; x++)
        {
            if (x < l.grid.width && y < l.grid.height) // Only save squares inside the play area, not the ones on the outside bottom and bottom-right (that are used to just make the visual square markers)
            {
                if (!l.grid.database['row' + y])
                {
                    l.grid.database['row' + y] = new Object()
                }

                if (!l.grid.database['row' + y]['column' + x])
                {
                    l.grid.database['row' + y]['column' + x] = new Object()
                }

                l.grid.database['row' + y]['column' + x].x = 0 - l.grid.width / 2 * size + x * size
                l.grid.database['row' + y]['column' + x].y = 0 - l.grid.height / 2 * size + y * size
            }
        }
    }
}

l.grid.get = function(row, column, value)
{
    if (value == 'x')
    {
        var center = l.canvas.width / 2
    }
    else
    {
        var center = l.canvas.height / 2
    }

    return center + l.grid.database['row' + row]['column' + column][value]
}