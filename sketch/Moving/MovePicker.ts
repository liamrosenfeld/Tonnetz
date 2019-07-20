class MovePicker {
  private sketch: p5;
  private manager: PositionManager;

  x: Float
  y: Float

  private left:        p5.Element;
  private parallel:    p5.Element;
  private right:       p5.Element;
  private nebenLeft:   p5.Element;
  private nebenRight:  p5.Element;
  private slide:       p5.Element;
  private hexatonic:   p5.Element;

  constructor(sketch: p5, manager: PositionManager, x: Float, y: Float) {
    this.sketch = sketch;
    this.manager = manager;

    this.x = x;
    this.y = y;
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let y = this.y
    this.sketch.text("Primary Operations", this.x, y);
    y += 10
    this.left = this.createButton("Left -", y, this.manager.left);
    y += 40
    this.parallel = this.createButton("Vertical - Parallel", y, this.manager.parallel);
    y += 40
    this.right = this.createButton("Right -", y, this.manager.right);

    y += 90
    this.sketch.text("Compound Operations", this.x, y)
    y += 10
    this.nebenLeft = this.createButton("Nebenverwandt Left ()", y, this.manager.nebenLeft);
    y += 40 
    this.nebenRight = this.createButton("Nebenverwandt Right ()", y, this.manager.nebenRight);
    y += 40
    this.slide = this.createButton("Slide (LPR)", y, this.manager.slide);
    y += 40
    this.hexatonic = this.createButton("Hexatonic Pole (LPL)", y, this.manager.hexatonicPole);

    this.drawKeyLabels();
  }

  drawKeyLabels() {
    this.sketch.textSize(15);
    
    let y = this.y + 29
    this.sketch.text("A", this.x + 10, y);
    y += 40
    this.sketch.text("S", this.x + 10, y);
    y += 40
    this.sketch.text("D", this.x + 10, y);
    y += 99
    this.sketch.text("Z", this.x + 10, y);
    y += 40
    this.sketch.text("X", this.x + 10, y);
    y += 40
    this.sketch.text("C", this.x + 10, y);
    y += 40
    this.sketch.text("V", this.x + 10, y);
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

  removeButtons() {
    this.left.remove()
    this.parallel.remove()
    this.right.remove()
    this.nebenLeft.remove()
    this.nebenRight.remove()
    this.slide.remove()
    this.hexatonic.remove()
  }

  createButton(text: string, y: Float, callback: () => boolean): p5.Element {
    let button = this.sketch.createButton(text);
    button.parent("sketch-holder");
    button.position(this.x + 30, y);
    button.style('font-size', '12px');
    button.style('padding', '5px');
    button.style('width', '190px');
    button.style('text-align', 'left');
    button.mousePressed(callback);
    return button;
  }
}
