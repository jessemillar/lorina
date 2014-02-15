l.draw = new Object() // Organize all the draw functions into one object

l.draw.blank = function()
{
    l.ctx.fillStyle = l.camera.color
    l.ctx.fillRect(l.camera.x, l.camera.y, l.camera.width, l.camera.height)
}

l.draw.rectangle = function(x, y, width, height, color, opacity) // Mainly for debug purposes
{
    if (x + width > l.camera.x && x < l.camera.width && y + height > l.camera.y && y < l.camera.height) // Only draw if visible on the screen
    {
        if (opacity)
        {
            l.ctx.globalAlpha = opacity
        }
        l.ctx.fillStyle = color
        l.ctx.fillRect(Math.round(x), Math.round(y), width, height)
        if (opacity)
        {
            l.ctx.globalAlpha = 1 // Reset the opacity after drawing the rectangle
        }
    }
}

l.draw.object = function(name)
{
    if (Math.round(l.entities[name].x + l.entities[name].width) > l.camera.x && Math.round(l.entities[name].x) < l.camera.width && Math.round(l.entities[name].y + l.entities[name].height) > l.camera.y && Math.round(l.entities[name].y) < l.camera.height)  // Only draw if visible on the screen
    {
        l.ctx.drawImage(l.entities[name].sprite, Math.round(l.entities[name].x), Math.round(l.entities[name].y))

        if (l.debug.anchor || l.debug.all)
        {
            l.draw.rectangle(l.entities[name].anchor.x, l.entities[name].anchor.y, 1, 1, '#ffff00')
        }
        if (l.debug.bounding || l.debug.all)
        {
            l.draw.rectangle(l.entities[name].x + l.entities[name].bounding.offset.x, l.entities[name].y + l.entities[name].bounding.offset.y, l.entities[name].bounding.width, l.entities[name].bounding.height, '#00ff00', 0.5)
        }
        if (l.debug.names || l.debug.all)
        {
            l.text.write(name, l.entities[name].x + l.entities[name].width, l.entities[name].y, '#ff0000')
        }
        if (l.debug.position || l.debug.all)
        {
            l.draw.rectangle(l.entities[name].x, l.entities[name].y, 1, 1, '#0000ff')
        }
    }
}