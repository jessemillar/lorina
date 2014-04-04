l.preloader = new Object() // Group the preloader functions

l.preloader.calculate = function()
{
    l.preloader.percent = Math.round((1 - l.preloader.count / l.preloader.total) * 100)
}

l.preloader.queue = function()
{
    if (l.preloader.count)
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
    if (l.preloader.count)
    {
        l.preloader.count -= 1 // Remove an image from the preloader queue once it's loaded
        l.preloader.calculate()
    	if (l.preloader.count == 0)
    	{
    		l.change.screen(l.screen.engine.start)
    	}
    }
    else
    {
        l.change.screen(l.screen.engine.start)
    }
}