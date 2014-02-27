l.physics = new Object() // Group the physics functions

l.game.physics = new Object() // Group the game's physics values

l.physics.update = function(name)
{
    if (l.entities[name].physics.momentum.x !== 0) // Horizontal motion
    {
        if (l.entities[name].physics.momentum.x < 0) // Moving to the left
        {
            l.move.left(name, Math.abs(l.entities[name].physics.momentum.x))
            l.entities[name].physics.momentum.x += l.game.physics.friction
            if (l.entities[name].physics.momentum.x > 0)
            {
                l.entities[name].physics.momentum.x = 0
            }
        }
        else if (l.entities[name].physics.momentum.x > 0) // Moving to the right
        {
            l.move.right(name, Math.abs(l.entities[name].physics.momentum.x))
            l.entities[name].physics.momentum.x -= l.game.physics.friction
            if (l.entities[name].physics.momentum.x < 0)
            {
                l.entities[name].physics.momentum.x = 0
            }
        }
    }

    if (l.entities[name].physics.momentum.y !== 0) // Vertical motion
    {
        if (l.entities[name].physics.momentum.y < 0) // Moving up
        {
            l.move.up(name, Math.abs(l.entities[name].physics.momentum.y))
            l.entities[name].physics.momentum.y += l.game.physics.friction
            if (l.entities[name].physics.momentum.y > 0)
            {
                l.entities[name].physics.momentum.y = 0
            }
        }
        else if (l.entities[name].physics.momentum.y > 0) // Moving down
        {
            l.move.down(name, Math.abs(l.entities[name].physics.momentum.y))
            l.entities[name].physics.momentum.y -= l.game.physics.friction
            if (l.entities[name].physics.momentum.y < 0)
            {
                l.entities[name].physics.momentum.y = 0
            }
        }
    }
}

l.physics.friction = function(friction)
{
    l.game.physics.friction = friction
}

l.physics.push = new Object() // Group the function that apply a push to an object

l.physics.push.up = function(name, force)
{
    l.entities[name].physics.momentum.y -= force
}

l.physics.push.down = function(name, force)
{
    l.entities[name].physics.momentum.y += force
}

l.physics.push.left = function(name, force)
{
    l.entities[name].physics.momentum.x -= force
}

l.physics.push.right = function(name, force)
{
    l.entities[name].physics.momentum.x += force
}

l.physics.push.toward = function(objectA, objectB, force)
{
    if (l.entities[objectA])
    {
        var speedX = l.measure.x(objectA, objectB) / l.measure.total(objectA, objectB) * force
        var speedY = l.measure.y(objectA, objectB) / l.measure.total(objectA, objectB) * force

        if (l.measure.total(objectA, objectB) > 0)
        {
            if (l.entities[objectA].anchor.x < l.entities[objectB].anchor.x && l.entities[objectA].anchor.y < l.entities[objectB].anchor.y)
            {
                l.physics.push.right(objectA, speedX)
                l.physics.push.down(objectA, speedY)
            }
            else if (l.entities[objectA].anchor.x > l.entities[objectB].anchor.x && l.entities[objectA].anchor.y < l.entities[objectB].anchor.y)
            {
                l.physics.push.left(objectA, speedX)
                l.physics.push.down(objectA, speedY)
            }
            else if (l.entities[objectA].anchor.x < l.entities[objectB].anchor.x && l.entities[objectA].anchor.y > l.entities[objectB].anchor.y)
            {
                l.physics.push.right(objectA, speedX)
                l.physics.push.up(objectA, speedY)
            }
            else if (l.entities[objectA].anchor.x > l.entities[objectB].anchor.x && l.entities[objectA].anchor.y > l.entities[objectB].anchor.y)
            {
                l.physics.push.left(objectA, speedX)
                l.physics.push.up(objectA, speedY)
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
                l.physics.push.toward(thingy[i], objectB, force)
            }
        }
    }
}