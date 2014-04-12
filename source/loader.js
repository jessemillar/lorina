var Loader = function()
{
    this.sprite = {img: new Image()}

    this.setSprite = function(location)
    {
        var self = this

        this.sprite.img.addEventListener('load', function()
        {
            self.sprite.width = this.width
            self.sprite.height = this.height

            l.preloader.current--
            l.preloader.percent = Math.round(l.preloader.current / l.preloader.total)

            if (l.preloader.current == 0)
            {
                l.loaded = true
            }
        })

        this.sprite.img.src = location

        l.preloader.total++
        l.preloader.current++

        return this
    }
}