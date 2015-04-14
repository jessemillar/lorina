var moonCount = 10;
var starCount = 2000;
var dustCount = 1000;

var earthSpeed = 0.5;
var earthFriction = earthSpeed / 15;
var starSpeed = 0.4;
var starFriction = 0.035;

var lorina = new l.lorina();
lorina.setTitle('SPACE!')
    .setColor('#111111')
    .makeFullscreen()
    .setRoomSize(l.globals.dom.width * 2, l.globals.dom.height * 2)
    .appendCanvas();

var typewriter = new l.typewriter();
typewriter.setFont('Wendy').setColor('#FFFFFF').setAlignment('center').setSize(35);

var moons = new l.group();
var stars = new l.group();
var dusties = new l.group();

var earth = new l.entity();
earth.setSprite('images/earth.png')
    .setPosition(l.globals.room.width / 2, l.globals.room.height / 2)
    .setSize(125, 125)
    .setAnchor(125 / 2, 125 / 2)
    .setBound(-125 / 2, -125 / 2, 125, 125)
    .setFriction(earthFriction);

var earth2 = new l.entity();
earth2.setSprite('images/earth.png')
    .setPosition(l.globals.room.width / 2 + 200, l.globals.room.height / 2 + 200)
    .setAnchor(125 / 2, 125 / 2);

var tool = new l.tool();

var i = moonCount;

while (i--) {
    var entity = 'moon' + i;

    var moon = new l.entity();
    moon.setSprite('images/moon.png')
        .setPosition(tool.random(0, l.globals.room.width), tool.random(0, l.globals.room.height))
        .setSize(100, 100)
        .setAnchor(100 / 2, 100 / 2)
        .setBound(-100 / 2, -100 / 2, 100, 100)
        .setFriction(starFriction);
    moons.add(moon);
}

var i = starCount;

while (i--) {
    var entity = 'star' + i;

    var entity = new l.entity();
    entity.setSprite('images/star.png')
        .setAnchor(4, 4)
        .setPosition(tool.random(0, l.globals.room.width), tool.random(0, l.globals.room.height))
        .setFriction(starFriction);
    stars.add(entity);
}

var i = dustCount;

while (i--) {
    var entity = 'dust' + i;

    var entity = new l.entity();
    entity.setSprite('images/dust.png')
        .setAnchor(2, 2)
        .setPosition(tool.random(0, l.globals.room.width), tool.random(0, l.globals.room.height));
    dusties.add(entity);
}

var keyboard = new l.keyboard();
var camera = new l.camera();

// I would recommend that you keep the data for your room functions in an external file and reference it here
var main = function() {
    if (keyboard.up || keyboard.w) {
        earth.pushVertical(-earthSpeed);
    } else if (keyboard.down || keyboard.s) {
        earth.pushVertical(earthSpeed);
    }

    if (keyboard.left || keyboard.a) {
        earth.pushHorizontal(-earthSpeed);
    } else if (keyboard.right || keyboard.d) {
        earth.pushHorizontal(earthSpeed);
    }

    stars.pullToward(earth, starSpeed).applyPhysics();

    earth.bounce().applyPhysics();

    var j = tool.checkCollision(earth, moons);
    if (j) {
        j.delete();
        camera.shake(2, 35, 250);
    }

    camera.follow(earth);

    lorina.blank();
    typewriter.setPosition(l.globals.room.width / 2, l.globals.room.height / 2 - 200).write('Hello, World.  Move with the arrow keys.');
    earth.buffer();
    // earth2.buffer()
    moons.buffer();
    stars.buffer();
    dusties.buffer();
    lorina.draw();
};

lorina.start(main); // Only call once the room functions are defined