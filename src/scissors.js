var Scissors = function()
{
    this.mark = function(x, y, width, height)
    {
        l.ctx.save()
        l.ctx.beginPath()

        l.ctx.rect(x, y, width, height)

        l.ctx.clip()

        return this
    }

    this.cut = function()
    {
        l.ctx.restore()

        return this
    }
}