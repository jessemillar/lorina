l.speaker = function() {
    var database = [];
    var stack = []; // For stacking sound effects

    this.load = function(name, location) {
    	var file;

        if (window.cordova) {
            var self = this;

            file = new Media(location);
            file.name = name;

            this.cordovaLoad(file);
        } else {
            file = new Audio();
            file.name = name;
            file.src = location;
            file.preload = 'auto';
        }

        database.push(file);

        return this;
    };

    this.pause = function(name) {
        var i = database.length;
        while (i--) {
            if (database[i].name == name) {
                database[i].pause();
                break;
            }
        }

        return this;
    };

    this.play = function(name) {
        var i = database.length;
        while (i--) {
            if (database[i].name == name) {
                if (window.cordova) {
                    var temp = new Media(database[i].src);
                    temp.name = database[i].name;

                    stack.push(temp);

                    stack[stack.length - 1].play({
                        playAudioWhenScreenIsLocked: false
                    });
                } else {
                    stack.push(database[i].cloneNode());

                    stack[stack.length - 1].play();

                    var self = this;
                    var index = stack.length - 1;

                    stack[stack.length - 1].addEventListener('ended', self.removeAudio(index)); // Remove the file upon successful play
                }

                break;
            }
        }

        return this;
    };

    this.removeAudio = function(index) {
        stack.splice(index, 1);
    };
};