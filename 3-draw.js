l.buffer = new Object() // Group the buffer functions (for z-indexing)

l.buffer.database = new Array() // The array we'll use to sort the objects-to-be-drawn by y coordinate for cool z-indexing

l.buffer.object = function(name, flipped)
{
    if (l.entities[name])
    {
        var thingy = new Object()
            thingy.name = name
            thingy.y = l.entities[name].anchor.y
            thingy.flipped = flipped

        l.buffer.database.push(thingy)
    }
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == name)
            {
                l.buffer.object(thingy[i], flipped)
            }
        }
    }
}

l.draw = new Object() // Organize all the draw functions into one object

l.draw.blank = function(color)
{
    if (color)
    {
        l.ctx.fillStyle = color
    }
    else
    {
        l.ctx.fillStyle = l.entities.camera.color
    }
    l.ctx.fillRect(0, 0, l.entities.camera.width, l.entities.camera.height) // Only draw where the camera can see for speed purposes
}

l.draw.rectangle = function(x, y, width, height, color, opacity) // ONLY for debug purposes
{
    if (Math.round(x + width) > Math.round(l.entities.camera.x) && Math.round(x) < Math.round(l.entities.camera.x + l.entities.camera.width) && Math.round(y + height) > Math.round(l.entities.camera.y) && Math.round(y) < Math.round(l.entities.camera.y + l.entities.camera.height)) // Only draw if visible on the screen
    {
        if (opacity)
        {
            l.ctx.globalAlpha = opacity
        }
        l.ctx.fillStyle = color
        l.ctx.fillRect(Math.round(x - l.entities.camera.x), Math.round(y - l.entities.camera.y), width, height)
        if (opacity)
        {
            l.ctx.globalAlpha = 1 // Reset the opacity after drawing the rectangle
        }
    }
}

l.draw.objects = function()
{
    l.buffer.database.sort(function(a, b) // Sort the database for z-indexing
    {
        return a.y - b.y
    })

    for (var i = 0; i < l.buffer.database.length; i++)
    {
        if (Math.round(l.entities[l.buffer.database[i].name].x + l.entities[l.buffer.database[i].name].width) > Math.round(l.entities.camera.x) && Math.round(l.entities[l.buffer.database[i].name].x) < Math.round(l.entities.camera.x + l.entities.camera.width) && Math.round(l.entities[l.buffer.database[i].name].y + l.entities[l.buffer.database[i].name].height) > Math.round(l.entities.camera.y) && Math.round(l.entities[l.buffer.database[i].name].y) < Math.round(l.entities.camera.y + l.entities.camera.height))  // Only draw if visible on the screen
        {
            if (l.buffer.database[i].flipped)
            {
                l.ctx.save()

                if (l.buffer.database[i].flipped == 'horizontal')
                {
                    l.ctx.translate(Math.round(l.entities[l.buffer.database[i].name].x + l.entities[l.buffer.database[i].name].width - l.entities.camera.x), Math.round(l.entities[l.buffer.database[i].name].y - l.entities.camera.y))
                    l.ctx.scale(-1, 1)
                }
                else if (l.buffer.database[i].flipped == 'vertical')
                {
                    l.ctx.translate(Math.round(l.entities[l.buffer.database[i].name].x - l.entities.camera.x), Math.round(l.entities[l.buffer.database[i].name].y + l.entities[l.buffer.database[i].name].height - l.entities.camera.y))
                    l.ctx.scale(1, -1)
                }
                else if (l.buffer.database[i].flipped == 'both')
                {
                    l.ctx.translate(Math.round(l.entities[l.buffer.database[i].name].x + l.entities[l.buffer.database[i].name].width - l.entities.camera.x), Math.round(l.entities[l.buffer.database[i].name].y + l.entities[l.buffer.database[i].name].height - l.entities.camera.y))
                    l.ctx.scale(-1, -1)
                }

                if (l.entities[l.buffer.database[i].name].animate.count)
                {
                    l.ctx.drawImage(l.entities[l.buffer.database[i].name].sprite, l.entities[l.buffer.database[i].name].animate.frame * (l.entities[l.buffer.database[i].name].animate.width / l.entities[l.buffer.database[i].name].animate.count), 0, l.entities[l.buffer.database[i].name].animate.width / l.entities[l.buffer.database[i].name].animate.count, l.entities[l.buffer.database[i].name].animate.height, 0, 0, l.entities[l.buffer.database[i].name].animate.width / l.entities[l.buffer.database[i].name].animate.count, l.entities[l.buffer.database[i].name].animate.height)
                }
                else
                {
                    l.ctx.drawImage(l.entities[l.buffer.database[i].name].sprite, 0, 0)
                }

                l.ctx.restore()
            }
            else
            {
                if (l.entities[l.buffer.database[i].name].animate.count)
                {
                    l.ctx.drawImage(l.entities[l.buffer.database[i].name].sprite, l.entities[l.buffer.database[i].name].animate.frame * (l.entities[l.buffer.database[i].name].animate.width / l.entities[l.buffer.database[i].name].animate.count), 0, l.entities[l.buffer.database[i].name].animate.width / l.entities[l.buffer.database[i].name].animate.count, l.entities[l.buffer.database[i].name].animate.height, Math.round(l.entities[l.buffer.database[i].name].x - l.entities.camera.x), Math.round(l.entities[l.buffer.database[i].name].y - l.entities.camera.y), l.entities[l.buffer.database[i].name].animate.width / l.entities[l.buffer.database[i].name].animate.count, l.entities[l.buffer.database[i].name].animate.height)
                }
                else
                {
                    l.ctx.drawImage(l.entities[l.buffer.database[i].name].sprite, Math.round(l.entities[l.buffer.database[i].name].x - l.entities.camera.x), Math.round(l.entities[l.buffer.database[i].name].y - l.entities.camera.y))
                }
            }

            if (l.debug.anchor || l.debug.all)
            {
                l.draw.rectangle(l.entities[l.buffer.database[i].name].anchor.x, l.entities[l.buffer.database[i].name].anchor.y, 1, 1, '#ffff00')
            }
            if (l.debug.bounding || l.debug.all)
            {
                l.draw.rectangle(l.entities[l.buffer.database[i].name].x + l.entities[l.buffer.database[i].name].bounding.offset.x, l.entities[l.buffer.database[i].name].y + l.entities[l.buffer.database[i].name].bounding.offset.y, l.entities[l.buffer.database[i].name].bounding.width, l.entities[l.buffer.database[i].name].bounding.height, '#00ff00', 0.5)
            }
            if (l.debug.names || l.debug.all)
            {
                l.text.write(name, l.entities[l.buffer.database[i].name].x + l.entities[l.buffer.database[i].name].width, l.entities[l.buffer.database[i].name].y, '#ff0000')
            }
            if (l.debug.position || l.debug.all)
            {
                l.draw.rectangle(l.entities[l.buffer.database[i].name].x, l.entities[l.buffer.database[i].name].y, 1, 1, '#0000ff')
            }
        }
    }

    l.buffer.database.length = 0
}

l.draw.hud = function(name, flipped)
{
    if (l.entities[name])
    {
        if (flipped)
        {
            l.ctx.save()
            if (flipped == 'horizontal')
            {
                l.ctx.translate(Math.round(l.entities[name].x + l.entities[name].width), Math.round(l.entities[name].y))
                l.ctx.scale(-1, 1)
            }
            else if (flipped == 'vertical')
            {
                l.ctx.translate(Math.round(l.entities[name].x), Math.round(l.entities[name].y + l.entities[name].height))
                l.ctx.scale(1, -1)
            }
            else if (flipped == 'both')
            {
                l.ctx.translate(Math.round(l.entities[name].x + l.entities[name].width), Math.round(l.entities[name].y + l.entities[name].height))
                l.ctx.scale(-1, -1)
            }
            
            if (l.entities[name].animate.count)
            {
                l.ctx.drawImage(l.entities[name].sprite, l.entities[name].animate.frame * (l.entities[name].animate.width / l.entities[name].animate.count), 0, l.entities[name].animate.width / l.entities[name].animate.count, l.entities[name].animate.height, 0, 0, l.entities[name].animate.width / l.entities[name].animate.count, l.entities[name].animate.height)
            }
            else
            {
                l.ctx.drawImage(l.entities[name].sprite, 0, 0)
            }
            l.ctx.restore()
        }
        else
        {
            if (l.entities[name].animate.count)
            {
                l.ctx.drawImage(l.entities[name].sprite, l.entities[name].animate.frame * (l.entities[name].animate.width / l.entities[name].animate.count), 0, l.entities[name].animate.width / l.entities[name].animate.count, l.entities[name].animate.height, Math.round(l.entities[name].x), Math.round(l.entities[name].y), l.entities[name].animate.width / l.entities[name].animate.count, l.entities[name].animate.height)
            }
            else
            {
                l.ctx.drawImage(l.entities[name].sprite, Math.round(l.entities[name].x), Math.round(l.entities[name].y))
            }
        }
    }
    else
    {
        var thingy = Object.keys(l.entities)
        
        for (var i = 0; i < thingy.length; i++)
        {
            if (l.entities[thingy[i]].category == name)
            {
                l.draw.hud(thingy[i], flipped)
            }
        }
    }
}