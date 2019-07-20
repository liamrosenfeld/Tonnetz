class DemoPicker {

  // managers
  private sketch: p5;
  private sizeManager: SizeManager

  // managed
  private manager: PositionManager;

  // buttons
  private brahmsButton: p5.Element;

  // position
  x: Float
  y: Float

  constructor(sketch: p5, manager: PositionManager, sizeManager: SizeManager) {
    this.sketch = sketch;
    this.manager = manager;
    this.sizeManager = sizeManager;

    this.reposition();
  }

  reposition() {
    this.x = this.sizeManager.demoX;
    this.y = this.sizeManager.demoY;
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let y = this.y
    this.sketch.text("Examples", this.x, y);
    y += 10
    this.brahmsButton = createButton(this.sketch, "Brahms Opus 102", this.x, y, this.brahms);
  }

  removeButtons() {
    this.brahmsButton.remove();
  }

  private brahms = () => {
    const test = new Recording(this.manager);
    test.playDemo(brahms102);
    return true;
  }

}
