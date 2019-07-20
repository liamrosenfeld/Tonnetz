class MovePicker {

  // managers
  private sketch: p5;
  private sizeManager: SizeManager;

  // managed
  private manager: PositionManager;

  // buttons
  private left: p5.Element;
  private parallel: p5.Element;
  private right: p5.Element;
  private nebenLeft: p5.Element;
  private nebenRight: p5.Element;
  private slide: p5.Element;
  private hexatonic: p5.Element;

  constructor(sketch: p5, manager: PositionManager, sizeManager: SizeManager) {
    this.sketch = sketch;
    this.manager = manager;
    this.sizeManager = sizeManager;
  }

  reposition() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let x = this.sizeManager.primaryX;
    let y = this.sizeManager.primaryY;
    this.sketch.text("Primary Operations", x, y);
    x += 30
    y += 10
    this.left.position(x, y);
    y += 40
    this.parallel.position(x, y);
    y += 40
    this.right.position(x, y);

    x = this.sizeManager.compoundX;
    y = this.sizeManager.compoundY;
    this.sketch.text("Compound Operations", x, y)
    x += 30
    y += 10
    this.nebenLeft.position(x, y);
    y += 40
    this.nebenRight.position(x, y);
    y += 40
    this.slide.position(x, y);
    y += 40
    this.hexatonic.position(x, y);

    this.drawKeyLabels();
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let x = this.sizeManager.primaryX;
    let y = this.sizeManager.primaryY;
    this.sketch.text("Primary Operations", x, y);
    x += 30
    y += 10
    this.left = createButton(this.sketch, "Left -", x, y, this.manager.left);
    y += 40
    this.parallel = createButton(this.sketch, "Vertical - Parallel", x, y, this.manager.parallel);
    y += 40
    this.right = createButton(this.sketch, "Right -", x, y, this.manager.right);

    x = this.sizeManager.compoundX;
    y = this.sizeManager.compoundY;
    this.sketch.text("Compound Operations", x, y)
    x += 30
    y += 10
    this.nebenLeft = createButton(this.sketch, "Nebenverwandt Left ()", x, y, this.manager.nebenLeft);
    y += 40
    this.nebenRight = createButton(this.sketch, "Nebenverwandt Right ()", x, y, this.manager.nebenRight);
    y += 40
    this.slide = createButton(this.sketch, "Slide (LPR)", x, y, this.manager.slide);
    y += 40
    this.hexatonic = createButton(this.sketch, "Hexatonic Pole (LPL)", x, y, this.manager.hexatonicPole);

    this.drawKeyLabels();
  }

  drawKeyLabels() {
    this.sketch.textSize(15);

    let x = this.sizeManager.primaryX + 10
    let y = this.sizeManager.primaryY + 29
    this.sketch.text("A", x, y);
    y += 40
    this.sketch.text("S", x, y);
    y += 40
    this.sketch.text("D", x, y);

    x = this.sizeManager.compoundX + 10
    y = this.sizeManager.compoundY + 29
    this.sketch.text("Z", x, y);
    y += 40
    this.sketch.text("X", x, y);
    y += 40
    this.sketch.text("C", x, y);
    y += 40
    this.sketch.text("V", x, y);
  }

  updateNames(major: boolean) {
    if (major) {
      this.left.html("Left - Relative");
      this.right.html("Right - Leading Tone");
      this.nebenLeft.html("Nebenverwandt Left (RLP)")
      this.nebenRight.html("Nebenverwandt Right (PRL)")
    } else {
      this.left.html("Left - Leading Tone");
      this.right.html("Right - Relative");
      this.nebenLeft.html("Nebenverwandt Left (PRL)")
      this.nebenRight.html("Nebenverwandt Right (RLP)")
    }
  }
}
