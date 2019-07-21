class DemoPicker {

  // managers
  private sketch: p5;
  private sizeManager: SizeManager

  // managed
  private manager: PositionManager;

  // buttons
  private brahmsButton: p5.Element;
  private hamiltonianButton: p5.Element;

  // labels
  readonly fontSize = 20
  private titleLabel: p5.Element;

  constructor(sketch: p5, manager: PositionManager, sizeManager: SizeManager) {
    this.sketch = sketch;
    this.manager = manager;
    this.sizeManager = sizeManager;
  }

  reposition() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let x = this.sizeManager.demoX;
    let y = this.sizeManager.demoY;
    
    this.titleLabel.position(x, y + this.fontSize);
    y += 10
    this.brahmsButton.position(x, y);
    y += 40
    this.hamiltonianButton.position(x, y);
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let x = this.sizeManager.demoX;
    let y = this.sizeManager.demoY;

    
    this.titleLabel = createLabel(this.sketch, "Examples", x, y, this.fontSize);
    y += 10
    this.brahmsButton = createButton(this.sketch, "Brahms Opus 102", x, y, this.brahms);
    y += 40
    this.hamiltonianButton = createButton(this.sketch, "Hamiltonian Path", x, y, this.hamiltonian);
  }

  private brahms = () => {
    const recording = new Recording(this.manager);
    recording.playDemo(Demos.brahms102());
    return true;
  }

  private hamiltonian = () => {
    const recording = new Recording(this.manager);
    recording.playDemo(Demos.hamiltonian(this.sizeManager.w, this.sizeManager.h));
    return true;
  }

}
