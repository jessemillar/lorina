l.prototype = new Object() // Group the object functions

l.prototype.entities = new Object() // The object that keeps track of our game objects

l.prototype.make = function(name, width, height)
{
    l.prototype.entities[name] = new Object()
        l.prototype.entities[name].width = width
        l.prototype.entities[name].height = height
        l.prototype.entities[name].bounding = new Object()
            l.prototype.entities[name].bounding.x = 0
            l.prototype.entities[name].bounding.y = 0
            l.prototype.entities[name].bounding.offset = new Object()
                l.prototype.entities[name].bounding.offset.x = 0
                l.prototype.entities[name].bounding.offset.y = 0
            l.prototype.entities[name].bounding.width = width
            l.prototype.entities[name].bounding.height = height
        l.prototype.entities[name].anchor = new Object()
            l.prototype.entities[name].anchor.offset = new Object()
                l.prototype.entities[name].anchor.offset.x = width / 2
                l.prototype.entities[name].anchor.offset.y = height / 2
            l.prototype.entities[name].anchor.x = width / 2
            l.prototype.entities[name].anchor.y = height / 2
        l.prototype.entities[name].physics = new Object()
            l.prototype.entities[name].physics.momentum = new Object()
                l.prototype.entities[name].physics.momentum.x = 0
                l.prototype.entities[name].physics.momentum.y = 0
                l.prototype.entities[name].physics.momentum.total = 0
}

l.prototype.categorize = function(name, category)
{
    l.prototype.entities[name].category = category
}

l.prototype.sprite = function(name, location, width, height, count, timer)
{
    l.preloader.queue()
    l.prototype.entities[name].sprite = new Image()
        l.prototype.entities[name].sprite.src = location
        l.prototype.entities[name].animate = new Object() // Group the non-src-related properties
            if (width)
            {
                l.prototype.entities[name].animate.width = width
            }
            else
            {
                l.prototype.entities[name].animate.width = l.prototype.entities[name].width
            }

            if (height)
            {
                l.prototype.entities[name].animate.height = height
            }
            else
            {
                l.prototype.entities[name].animate.height = l.prototype.entities[name].height
            }

            if (count)
            {
                l.prototype.entities[name].animate.count = count
                l.prototype.entities[name].animate.frame = 0
            }

            if (timer)
            {
                l.prototype.entities[name].animate.timer = timer
            }
    l.prototype.entities[name].sprite.onload = function()
    {
        l.preloader.update()
    }
}

l.prototype.anchor = function(name, x, y)
{
    l.prototype.entities[name].x -= x
    l.prototype.entities[name].y -= y
    l.prototype.entities[name].anchor.offset.x = x
    l.prototype.entities[name].anchor.offset.y = y
    l.prototype.update(name)
}

l.prototype.bounding = function(name, x, y, width, height)
{
    l.prototype.entities[name].bounding.offset.x = x
    l.prototype.entities[name].bounding.offset.y = y
    l.prototype.entities[name].bounding.width = width
    l.prototype.entities[name].bounding.height = height
    l.prototype.update(name)
}

l.prototype.update = function(name) // Update "hidden" values that relate to the position of the object
{
    // Shift the anchor point (whether manually supplied or automatically centered) to reflect the object's new position
    l.prototype.entities[name].anchor.x = l.prototype.entities[name].anchor.offset.x
    l.prototype.entities[name].anchor.y = l.prototype.entities[name].anchor.offset.y
    // Shift the bounding box (whether manually supplied or automatically encompassing) to reflect the object's new position
    l.prototype.entities[name].bounding.x = l.prototype.entities[name].bounding.offset.x
    l.prototype.entities[name].bounding.y = l.prototype.entities[name].bounding.offset.y
}