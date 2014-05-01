var Cartographer = function()
{
    this.loadMap = function(map)
    {
        map.tileset.img = new Image()

        map.tileset.img.onload = function()
        {
            map.tileset.width = this.width
            map.tileset.height = this.height
        }

        map.tileset.img.src = map.tileset.image

        return this
    }

    this.drawMap = function(map)
    {
        var y = map.layout.data.length / map.layout.width
        while (y--)
        {
            var x = map.layout.width
            while (x--)
            {
                l.ctx.drawImage(map.tileset.img, map.layout.data[y * map.layout.width + x] * (map.tileset.width / map.tileset.count), 0, map.tileset.width / map.tileset.count, map.tileset.height, x * (map.tileset.width / map.tileset.count) - l.camera.x, y * map.tileset.height - l.camera.y, map.tileset.width / map.tileset.count, map.tileset.height)
            }
        }

        return this
    }
}