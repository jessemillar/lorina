l.keyboard = function() {
    this.codes = [8, 9, 13, 16, 17, 18, 27, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
    this.keys = ['backspace', 'tab', 'enter', 'shift', 'ctrl', 'alt', 'escape', 'left', 'up', 'right', 'down', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var self = this;

    window.onkeydown = function() {
        self.pressed(event);
    };

    window.onkeyup = function() {
        self.cancel(event);
    };

    this.pressed = function(event) {
        for (var i = 0; i < this.codes.length; i++) {
            if (this.codes[i] == event.keyCode) {
                this[this.keys[i]] = true;
            }
        }
    };

    this.cancel = function(event) {
        for (var i = 0; i < this.codes.length; i++) {
            if (this.codes[i] == event.keyCode) {
                this[this.keys[i]] = false;
            }
        }
    };
};
