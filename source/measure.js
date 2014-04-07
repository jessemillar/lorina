var Measure = function()
{
    this.random = function(min, max)
    {
        return Math.random() * (max - min) + min
    }
}