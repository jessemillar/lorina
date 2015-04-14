var butterflyCount = 250;
var butterflyForce = 2;

var lorina = new l.lorina();
lorina.setTitle('Catterfly')
    .setColor('#7FDBFF')
    .makeFullscreen()
    .appendCanvas();

var typewriter = new l.typewriter();
typewriter.setSize(20).setFont('Helvetica').setColor('#111111').setStyle('bold italic');

var butterflies = new l.group();
var tool = new l.tool();

var i = butterflyCount;

while (i--) {
    var entity = 'butterfly' + i;

    var entity = new l.entity();
    entity.setSprite('images/butterfly.png')
        .setPosition(tool.random(0, l.globals.room.width), tool.random(0, l.globals.room.height))
        .setAnchor(25, 25)
        .setSize(50, 50)
        .setAnimation(2, tool.random(200, 300))
        .setFriction(0)
        .scatter(butterflyForce);
    butterflies.add(entity);
}

var main = function() {
    butterflies.steer().bounce().applyPhysics();

    lorina.blank();
    butterflies.buffer(); //.debug()
    lorina.draw();
};

lorina.start(main);