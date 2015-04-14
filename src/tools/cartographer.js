l.cartographer = function() {
    this.setMap = function(map) {
        map.tileset.img = new Image();

        map.tileset.img.onload = function() {
            map.tileset.width = this.width;
            map.tileset.height = this.height;
        };

        map.tileset.img.src = map.tileset.image;

        return this;
    };

    this.draw = function(map) {
        var y = map.layout.tiles.length / map.layout.width;
        while (y--) {
            var x = map.layout.width;
            while (x--) {
                if (map.layout.tiles[y * map.layout.width + x] > 0) {
                    l.globals.ctx.drawImage(map.tileset.img, (map.layout.tiles[y * map.layout.width + x] - 1) * (map.tileset.width / map.tileset.count), 0, map.tileset.width / map.tileset.count, map.tileset.height, x * (map.tileset.width / map.tileset.count) - l.globals.camera.x, y * map.tileset.height - l.globals.camera.y, map.tileset.width / map.tileset.count, map.tileset.height);
                }
            }
        }

        return this;
    };
};