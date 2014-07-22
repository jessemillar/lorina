var Tool = function()
{
    this.random = function(min, max)
    {
        return Math.random() * (max - min) + min
    }

    this.measureX = function(a, b)
    {
    	return Math.abs(a.x - b.x)
    }

    this.measureY = function(a, b)
    {
    	return Math.abs(a.y - b.y)
    }

    this.measureDistance = function(a, b)
    {
    	var x = this.measureX(a, b)
    	var y = this.measureY(a, b)

    	return Math.sqrt(x * x + y * y)
    }

    this.measureAngle = function(a, b)
    {
        var x = b.x - a.x
        var y = a.y - b.y

        var angle = Math.atan(y / x) * 180 / Math.PI

        if (x < 0)
        {
            angle += 180
        }
        else if (x > 0 && y < 0)
        {
            angle += 360
        }

        return angle
    }

    this.checkSolid = function(a, b)
    {
        var i = this.checkCollision(a, b)

        if (i)
        {
            if (a.previous.y + a.bound.y + a.bound.height <= i.y + i.bound.y)
            {
                a.y = i.y + i.bound.y - (a.bound.height + a.bound.y)
            }
            else if (a.previous.y + a.bound.y >= i.y + i.bound.y + i.bound.height)
            {
                a.y = i.y + i.bound.y + i.bound.height - a.bound.y
            }
            else if (a.previous.x + a.bound.x + a.bound.width < i.x)
            {
                a.x = i.x + i.bound.x - (a.bound.width + a.bound.x)
            }
            else if (a.previous.x + a.bound.x > i.x)
            {
                a.x = i.x + i.bound.x + i.bound.width - a.bound.x
            }
        }

        return this
    }

    this.checkCollision = function(a, b)
    {
        if (!a.deleted)
        {
            if (b.database)
            {
                var i = b.database.length

                while (i--)
                {
                    if (!b.database[i].deleted)
                    {
                        if (a.x + a.bound.x < b.database[i].x + b.database[i].bound.x + b.database[i].bound.width && a.x + a.bound.x + a.bound.width > b.database[i].x + b.database[i].bound.x && a.y + a.bound.y < b.database[i].y + b.database[i].bound.y + b.database[i].bound.height && a.y + a.bound.y + a.bound.height > b.database[i].y + b.database[i].bound.y)
                        {
                            return b.database[i]
                        }
                    }
                }

                return false
            }
            else
            {
                if (a.x + a.bound.x < b.x + b.bound.x + b.bound.width && a.x + a.bound.x + a.bound.width > b.x + b.bound.x && a.y + a.bound.y < b.y + b.bound.y + b.bound.height && a.y + a.bound.y + a.bound.height > b.y + b.bound.y)
                {
                    return b
                }
                else
                {
                    return false
                }
            }
        }
        else
        {
            return false
        }
    }
}