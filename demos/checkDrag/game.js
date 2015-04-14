var lorina = new l.lorina();
lorina.setTitle('checkDrag')
    .setColor('#dddddd')
    .makeFullscreen()
    .appendCanvas();

var thingy = new l.entity();
thingy.setSprite('test.png', true, true)
    .setPosition(10, 10);

var mouse = new l.mouse();

var main = function() {
    mouse.checkDrag(thingy);

    lorina.blank();

    thingy.draw();

    lorina.draw();
};

lorina.start(main);