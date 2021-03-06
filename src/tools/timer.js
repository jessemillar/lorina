l.timer = function() {
    this.start = function() {
        var date = new Date();
        this.time = Date.parse(date);

        return this;
    };

    this.clear = function() {
        this.time = undefined;

        return this;
    };

    this.check = function() {
        if (this.time) {
            var date = new Date();
            var now = Date.parse(date);

            return now - this.time;
        } else {
            return 0;
        }
    };

    this.compareTo = function(other) {
    	var difference;

        if (other.time) {
            if (this.time > other.time) {
                difference = this.time - other.time;
            } else {
                difference = other.time - this.time;
            }

            return difference;
        } else {
            return 0;
        }
    };
};