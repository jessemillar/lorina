l.pencil = function() {
    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;

        return this;
    };

    this.setEndPosition = function(x, y) // For drawing lines
    {
        this.endX = x;
        this.endY = y;

        return this;
    };

    this.setSize = function(width, height) {
        this.width = width;
        this.height = height;

        return this;
    };

    this.setRadius = function(radius) {
        this.radius = radius;

        return this;
    };

    this.setColor = function(color) {
        this.color = color;

        return this;
    };

    this.setOpacity = function(opacity) {
        this.opacity = opacity;

        return this;
    };

    this.setStroke = function(width) {
        this.stroke = width;

        return this;
    };

    this.setArc = function(start, stop) {
        this.start = start;
        this.stop = stop;

        return this;
    };

    this.strokeLine = function() {
        l.globals.ctx.strokeStyle = this.color;
        l.globals.ctx.lineWidth = this.stroke;

        l.globals.ctx.beginPath();

        // Use a little hackery to allow 1px lines
        l.globals.ctx.moveTo(Math.round(this.x) + 0.5, Math.round(this.y) + 0.5);
        l.globals.ctx.lineTo(Math.round(this.endX) + 0.5, Math.round(this.endY) + 0.5);

        if (this.opacity) {
            l.globals.ctx.globalAlpha = this.opacity;
        }

        l.globals.ctx.stroke();

        this.opacity = 1;
        l.globals.ctx.globalAlpha = 1;

        return this;
    };

    this.strokeCircle = function() {
        l.globals.ctx.strokeStyle = this.color;
        l.globals.ctx.lineWidth = this.stroke;

        l.globals.ctx.beginPath();
        l.globals.ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2 * Math.PI);

        if (this.opacity) {
            l.globals.ctx.globalAlpha = this.opacity;
        }

        l.globals.ctx.stroke();

        this.opacity = 1;
        l.globals.ctx.globalAlpha = 1;

        return this;
    };

    this.fillCircle = function() {
        l.globals.ctx.fillStyle = this.color;

        l.globals.ctx.beginPath();
        l.globals.ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2 * Math.PI);

        if (this.opacity) {
            l.globals.ctx.globalAlpha = this.opacity;
        }

        l.globals.ctx.fill();

        this.opacity = 1;
        l.globals.ctx.globalAlpha = 1;

        return this;
    };

    this.strokeArc = function() {
        l.globals.ctx.strokeStyle = this.color;
        l.globals.ctx.lineWidth = this.stroke;

        l.globals.ctx.beginPath();
        l.globals.ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, this.start * Math.PI / 180, this.stop * Math.PI / 180);

        if (this.opacity) {
            l.globals.ctx.globalAlpha = this.opacity;
        }

        l.globals.ctx.stroke();

        this.opacity = 1;
        l.globals.ctx.globalAlpha = 1;

        return this;
    };

    this.fillArc = function() {
        l.globals.ctx.fillStyle = this.color;

        l.globals.ctx.beginPath();
        l.globals.ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, this.start * Math.PI / 180, this.stop * Math.PI / 180);

        if (this.opacity) {
            l.globals.ctx.globalAlpha = this.opacity;
        }

        l.globals.ctx.fill();

        this.opacity = 1;
        l.globals.ctx.globalAlpha = 1;

        return this;
    };

    this.strokeRectangle = function() {
        l.globals.ctx.strokeStyle = this.color;
        l.globals.ctx.lineWidth = this.stroke;

        l.globals.ctx.beginPath();
        l.globals.ctx.rect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));

        if (this.opacity) {
            l.globals.ctx.globalAlpha = this.opacity;
        }

        l.globals.ctx.stroke();

        this.opacity = 1;
        l.globals.ctx.globalAlpha = 1;

        return this;
    };

    this.fillRectangle = function() {
        l.globals.ctx.fillStyle = this.color;

        l.globals.ctx.beginPath();
        l.globals.ctx.rect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));

        if (this.opacity) {
            l.globals.ctx.globalAlpha = this.opacity;
        }

        l.globals.ctx.fill();

        this.opacity = 1;
        l.globals.ctx.globalAlpha = 1;

        return this;
    };

    this.fillPie = function(percent) {
        if (Math.round(percent) < 100) {
            var degree = 270 + (360 / 100 * percent);

            if (degree > 360) {
                degree -= 360;
            }

            l.globals.ctx.fillStyle = this.color;

            l.globals.ctx.beginPath();
            l.globals.ctx.moveTo(Math.round(this.x), Math.round(this.y));
            l.globals.ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 270 * Math.PI / 180, degree * Math.PI / 180);
            l.globals.ctx.lineTo(Math.round(this.x), Math.round(this.y));

            if (this.opacity) {
                l.globals.ctx.globalAlpha = this.opacity;
            }

            l.globals.ctx.fill();

            this.opacity = 1;
            l.globals.ctx.globalAlpha = 1;
        } else {
            this.fillCircle();
        }

        return this;
    };
};