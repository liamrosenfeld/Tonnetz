const s = (sketch: p5) => {

  let manager: PositionManager;
  
  let movePicker: MovePicker;
  let demoPicker: DemoPicker;
  let recoPicker: RecordingPicker;

  sketch.setup = () => {
    sketch.createCanvas(1300, 700);
    sketch.background(51);
    sketch.noLoop();

    manager = new PositionManager(sketch);
    
    movePicker = new MovePicker(sketch, manager);
    demoPicker = new DemoPicker(sketch, manager);
    recoPicker = new RecordingPicker(sketch, manager);
  
    movePicker.drawButtons();
    demoPicker.drawButtons();
    recoPicker.drawButtons();
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
  }
};

let myp5 = new p5(s);
