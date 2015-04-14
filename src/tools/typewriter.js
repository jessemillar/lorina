l.typewriter = function() {
    this.reset = function() {
        this.alignment = undefined;
        this.baseline = undefined;
        this.opacity = undefined;
        this.style = undefined;
        this.font = undefined;
        this.size = undefined;
        this.color = undefined;
        this.textMode = undefined;

        return this;
    };

    this.setOpacity = function(opacity) {
        this.opacity = opacity;

        return this;
    };

    this.setStyle = function(style) {
        this.style = style;

        return this;
    };

    this.setFont = function(font) {
        this.font = font;

        return this;
    };

    this.setSize = function(size) {
        this.size = size;

        return this;
    };

    this.setAlignment = function(alignment) {
        this.alignment = alignment;

        return this;
    };

    this.setBaseline = function(baseline) {
        this.baseline = baseline;

        return this;
    };

    this.setColor = function(color) {
        this.color = color;

        return this;
    };

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;

        return this;
    };

    this.write = function(string, hud) {
    	var style;
    	var font;

        if (this.style) {
            style = this.style;
        } else {
            style = '';
        }

        if (this.font) {
            font = this.font;
        } else {
            font = 'sans-serif';
        }

        l.globals.ctx.font = style + ' ' + this.size + 'px ' + font;

        if (this.color) {
            l.globals.ctx.fillStyle = this.color;
        } else {
            l.globals.ctx.fillStyle = '#000000';
        }

        if (this.alignment) {
            l.globals.ctx.textAlign = this.alignment;
        } else {
            l.globals.ctx.textAlign = 'left';
        }

        if (this.baseline == 'top') {
            l.globals.ctx.textBaseline = 'hanging';
        } else if (this.baseline == 'middle') {
            l.globals.ctx.textBaseline = 'middle';
        } else if (this.baseline == 'bottom') {
            l.globals.ctx.textBaseline = 'alphabetic';
        } else {
            l.globals.ctx.textBaseline = 'hanging';
        }

        if (this.opacity) {
            l.globals.ctx.globalAlpha = this.opacity;
            this.opacity = 1;
        }

        if (hud) {
            l.globals.ctx.fillText(string, this.x, this.y);
        } else {
            l.globals.ctx.fillText(string, this.x - l.globals.camera.x, this.y - l.globals.camera.y);
        }

        l.globals.ctx.globalAlpha = 1;

        return this;
    };

    var typingStringLoaded = false;
    var typingPosition = 0;
    var stringToType = '';

    this.type = function(string, timing) {
        if (!typingStringLoaded) {
            this.key(string, timing);
            typingStringLoaded = true;
        }

        this.write(string.substr(0, typingPosition));

        return this;
    };

    this.key = function(string, timing) {
        for (var i = 0; i < string.length; i++) {
            setTimeout(function() {
                typingPosition++;
            }, timing * i);
        }
    };
};