l.draw = new Object() // Organize all the draw functions into one object

l.draw.blank = function()
{
    l.ctx.fillStyle = l.camera.color
    l.ctx.fillRect(l.camera.x, l.camera.y, l.camera.width, l.camera.height)
}

l.draw.object = function(name)
{
    if (l.entities[name].sprite)
    {
        l.ctx.drawImage(l.entities[name].sprite, Math.round(l.entities[name].x), Math.round(l.entities[name].y))
    }
    else
    {
        console.log('No loaded sprite for the ' + l.entities[name].name + ' entity')
    }
}