const s = (sketch: p5) => {

  let manager: PositionManager;
  let picker: MovePicker;

  sketch.setup = () => {
    manager = new PositionManager(sketch);
    picker  = new MovePicker(sketch, manager);

    sketch.createCanvas(1300, 700);
    sketch.background(51);
    picker.addButtons();
  };

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

    sketch.redraw();
  }
};

let myp5 = new p5(s);