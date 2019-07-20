class DemoPicker {

  // managers
  private sketch: p5;
  private sizeManager: SizeManager

  // managed
  private manager: PositionManager;

  // buttons
  private brahmsButton: p5.Element;

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

    this.sketch.text("Examples", x, y);
    y += 10
    this.brahmsButton.position(x, y);
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let x = this.sizeManager.demoX;
    let y = this.sizeManager.demoY;

    this.sketch.text("Examples", x, y);
    y += 10
    this.brahmsButton = createButton(this.sketch, "Brahms Opus 102", x, y, this.brahms);
  }

  private brahms = () => {
    const test = new Recording(this.manager);
    test.playDemo(brahms102);
    return true;
  }

}
