const s = (sketch: p5) => {

  let manager = new PositionManager(sketch);
  let playing = false;

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
    manager.lattice.draw();
  };

  sketch.keyPressed = () => {
    if (sketch.key == 's') {
      manager.moveVertically();
    } else if (sketch.key == 'a') {
      manager.moveLeft();
    } else if (sketch.key == 'd') {
      manager.moveRight();
    }

    if (!playing) {
      manager.player.play();
    }
    sketch.redraw();
  }
};

let myp5 = new p5(s);