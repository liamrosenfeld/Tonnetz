const s = (sketch: p5) => {

  var lattice = new Lattice(sketch, 12, 5);
  var player = new Player(sketch);
  var playing = false;

  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(51);
  };

  sketch.windowResized = () => {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(51);
    sketch.redraw();
  }

  sketch.draw = () => {
    lattice.draw();
  };

  sketch.keyPressed = () => {
    if (sketch.key == 's') {
      lattice.moveVertically();
      player.setTriPosition(lattice.getSelectedX, lattice.getSelectedY);
    } else if (sketch.key == 'a') {
      lattice.moveLeft();
      player.setTriPosition(lattice.getSelectedX, lattice.getSelectedY);
    } else if (sketch.key == 'd') {
      lattice.moveRight();
      player.setTriPosition(lattice.getSelectedX, lattice.getSelectedY);
    }

    if (!playing) {
      player.play();
    }
    sketch.redraw();
  }
};

let myp5 = new p5(s);