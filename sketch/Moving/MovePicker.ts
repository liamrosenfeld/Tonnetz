class MovePicker {

  // managers
  private sketch: p5;
  private sizeManager: SizeManager;

  // managed
  private manager: PositionManager;

  // buttons
  private readonly buttonSpacing = 30;
  private left: p5.Element;
  private parallel: p5.Element;
  private right: p5.Element;
  private nebenLeft: p5.Element;
  private nebenRight: p5.Element;
  private slide: p5.Element;
  private hexatonic: p5.Element;

  // labels
  private mainFontSize = 20;
  private primaryLabel: p5.Element;
  private compoundLabel: p5.Element;

  private secondaryFontSize = 15;
  private aLabel: p5.Element;
  private sLabel: p5.Element;
  private dLabel: p5.Element;
  private zLabel: p5.Element;
  private xLabel: p5.Element;
  private cLabel: p5.Element;
  private vLabel: p5.Element;

  constructor(sketch: p5, manager: PositionManager, sizeManager: SizeManager) {
    this.sketch = sketch;
    this.manager = manager;
    this.sizeManager = sizeManager;
  }

  drawButtons() {
    let x = this.sizeManager.primaryX;
    let y = this.sizeManager.primaryY;
    this.primaryLabel = createLabel(this.sketch, "Primary", x, y, this.mainFontSize);
    x += 30
    y += 10
    this.left = createButton(this.sketch, "Left -", x, y, this.manager.left);
    y += this.buttonSpacing
    this.parallel = createButton(this.sketch, "Vertical - Parallel", x, y, this.manager.parallel);
    y += this.buttonSpacing
    this.right = createButton(this.sketch, "Right -", x, y, this.manager.right);

    x = this.sizeManager.compoundX;
    y = this.sizeManager.compoundY;
    this.compoundLabel = createLabel(this.sketch, "Compound", x, y, this.mainFontSize);
    x += 30
    y += 10
    this.nebenLeft = createButton(this.sketch, "Nebenverwandt Left ()", x, y, this.manager.nebenLeft);
    y += this.buttonSpacing
    this.nebenRight = createButton(this.sketch, "Nebenverwandt Right ()", x, y, this.manager.nebenRight);
    y += this.buttonSpacing
    this.slide = createButton(this.sketch, "Slide (LPR)", x, y, this.manager.slide);
    y += this.buttonSpacing
    this.hexatonic = createButton(this.sketch, "Hexatonic Pole (LPL)", x, y, this.manager.hexatonicPole);

    this.drawKeyLabels();
  }

  drawKeyLabels() {
    let x = this.sizeManager.primaryX + 10
    let y = this.sizeManager.primaryY + 29
    this.aLabel = createLabel(this.sketch, "A", x, y, this.secondaryFontSize);
    y += this.buttonSpacing
    this.sLabel = createLabel(this.sketch, "S", x, y, this.secondaryFontSize);
    y += this.buttonSpacing
    this.dLabel = createLabel(this.sketch, "D", x, y, this.secondaryFontSize);

    x = this.sizeManager.compoundX + 10
    y = this.sizeManager.compoundY + 29
    this.zLabel = createLabel(this.sketch, "Z", x, y, this.secondaryFontSize);
    y += this.buttonSpacing
    this.xLabel = createLabel(this.sketch, "X", x, y, this.secondaryFontSize);
    y += this.buttonSpacing
    this.cLabel = createLabel(this.sketch, "C", x, y, this.secondaryFontSize);
    y += this.buttonSpacing
    this.vLabel = createLabel(this.sketch, "V", x, y, this.secondaryFontSize);
  }

  reposition() {
    let x = this.sizeManager.primaryX;
    let y = this.sizeManager.primaryY ;
    this.primaryLabel.position(x, y - this.mainFontSize);
    x += 30
    y += 10
    this.left.position(x, y);
    y += this.buttonSpacing
    this.parallel.position(x, y);
    y += this.buttonSpacing
    this.right.position(x, y);

    x = this.sizeManager.compoundX;
    y = this.sizeManager.compoundY;
    this.compoundLabel.position(x, y - this.mainFontSize);
    x += 30
    y += 10
    this.nebenLeft.position(x, y);
    y += this.buttonSpacing
    this.nebenRight.position(x, y);
    y += this.buttonSpacing
    this.slide.position(x, y);
    y += this.buttonSpacing
    this.hexatonic.position(x, y);

    this.repositionKeyLabels();
  }

  repositionKeyLabels() {
    let x = this.sizeManager.primaryX + 10;
    let y = this.sizeManager.primaryY + 29  ;
    this.aLabel.position(x, y - this.secondaryFontSize);
    y += this.buttonSpacing 
    this.sLabel.position(x, y - this.secondaryFontSize);
    y += this.buttonSpacing 
    this.dLabel.position(x, y - this.secondaryFontSize);

    x = this.sizeManager.compoundX + 10
    y = this.sizeManager.compoundY + 29 
    this.zLabel.position(x, y - this.secondaryFontSize);
    y += this.buttonSpacing 
    this.xLabel.position(x, y - this.secondaryFontSize);
    y += this.buttonSpacing 
    this.cLabel.position(x, y - this.secondaryFontSize);
    y += this.buttonSpacing 
    this.vLabel.position(x, y - this.secondaryFontSize);
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
