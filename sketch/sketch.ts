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
    switch(sketch.key) {
      case 'a' : { manager.leadingTone();   break};
      case 's' : { manager.parallel();      break};
      case 'd' : { manager.relative();      break};
      case 'z' : { manager.nebenLeft();     break};
      case 'x' : { manager.nebenRight();    break};
      case 'c' : { manager.slide();         break};
      case 'v' : { manager.hexatonicPole(); break};
    }

    manager.update();

    if (!playing) {
      manager.player.play();
    }
    sketch.redraw();
  }
};

let myp5 = new p5(s);