l.scissors = function() {
    this.mark = function(x, y, width, height) {
        l.globals.ctx.save();
        l.globals.ctx.beginPath();

        l.globals.ctx.rect(x, y, width, height);

        l.globals.ctx.clip();

        return this;
    };

    this.cut = function() {
        l.globals.ctx.restore();

        return this;
    };
};