const s = (sketch: p5) => {

  // managers
  let manager: PositionManager;
  let sizeManager: SizeManager;
  
  // pickers
  let movePicker: MovePicker;
  let demoPicker: DemoPicker;
  let recoPicker: RecordingPicker;
  let playPicker: PlayerPicker;

  sketch.setup = () => {
    // create canvas
    let canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    canvas.parent('sketch-holder')
    sketch.background(51);
    sketch.noLoop();

    // managers
    sizeManager = new SizeManager(sketch);
    manager = new PositionManager(sketch, sizeManager);
    
    // pickers
    movePicker = new MovePicker(sketch, manager, sizeManager);
    recoPicker = new RecordingPicker(sketch, manager, sizeManager);
    demoPicker = new DemoPicker(sketch, manager, sizeManager);
    playPicker = new PlayerPicker(sketch, manager, sizeManager);
    
    // draw pickers
    movePicker.drawButtons();
    demoPicker.drawButtons();
    recoPicker.drawButtons();
    playPicker.drawButtons();
  };

  let resizeCounter = 0; 

  sketch.windowResized = () => {
    // limit resize rate
    resizeCounter += 1;
    if (resizeCounter % 5 != 0) { return }

    // reset canvas
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(51);
    sketch.clear();

    // reset positions
    movePicker.reposition();
    demoPicker.reposition();
    recoPicker.reposition();
    playPicker.reposition();

    // clear dom
    movePicker.removeButtons();
    demoPicker.removeButtons();
    recoPicker.removeButtons();
    playPicker.removeButtons();

    // repopulate dom
    movePicker.drawButtons();
    demoPicker.drawButtons();
    recoPicker.drawButtons();
    playPicker.drawButtons();
    
    // update manager sizes
    sizeManager.calcSizes()
    manager.newSize();

    // redraw lattice
    sketch.redraw();
  }

  sketch.draw = () => {
    manager.lattice.draw();
    movePicker.updateNames(manager.major());
  };

  sketch.keyPressed = () => {
    const key = sketch.key.toLowerCase();
    switch(key) {
      case 'a' : { manager.left();          break};
      case 's' : { manager.parallel();      break};
      case 'd' : { manager.right();         break};
      case 'z' : { manager.nebenLeft();     break};
      case 'x' : { manager.nebenRight();    break};
      case 'c' : { manager.slide();         break};
      case 'v' : { manager.hexatonicPole(); break};
    }
  }
};

let myp5 = new p5(s);
