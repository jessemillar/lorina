var Clipper = function()
{
    this.start = function(x, y, width, height)
    {
        l.ctx.save()
        l.ctx.beginPath()

        l.ctx.rect(x, y, width, height)

        l.ctx.clip()

        return this
    }

    this.end = function()
    {
        l.ctx.restore()

        return this
    }
}