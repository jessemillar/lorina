var lorina = new l.lorina();
lorina.setTitle('Clipper')
    .setColor('#dddddd')
    .appendCanvas();

var map = new l.entity();
map.setSprite('terrain.png', true, true)
    .setPosition(0, 0);

var scissors = new l.scissors();

var main = function() {
    lorina.blank();

    scissors.mark(50, 50, 100, 50);
    map.draw();
    scissors.cut();

    lorina.draw();
};

lorina.start(main);