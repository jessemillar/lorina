l.preloader = new Object() // Group the preloader functions

l.preloader.calculate = function()
{
    l.preloader.percent = Math.round((1 - l.preloader.count / l.preloader.total) * 100)
}

l.preloader.queue = function()
{
    l.game.state = 'loading'
    if (l.preloader.count) // Add an audio file to the preloader queue
    {
        l.preloader.total += 1
        l.preloader.count += 1
    }
    else
    {
        l.preloader.total = 1
        l.preloader.count = 1
    }
    l.preloader.calculate()
}

l.preloader.update = function()
{
    l.preloader.count -= 1 // Remove an image from the preloader queue once it's loaded
    l.preloader.calculate()
        if (l.preloader.count == 0)
        {
            l.game.state = 'menu'
        }
}