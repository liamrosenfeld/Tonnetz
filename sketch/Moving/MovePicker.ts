class MovePicker {
  private sketch: p5;
  private manager: PositionManager;

  x: Float
  y: Float

  private leadingTone: p5.Element;
  private parallel:    p5.Element;
  private relative:    p5.Element;
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
    this.leadingTone = this.createButton("Leading Tone", y, this.manager.leadingTone);
    y += 40
    this.parallel = this.createButton("Parallel", y, this.manager.parallel);
    y += 40
    this.relative = this.createButton("Relative", y, this.manager.relative);

    y += 90
    this.sketch.text("Compound Operations", this.x, y)
    y += 10
    this.nebenLeft = this.createButton("Nebenverwandt Left (LLP)", y, this.manager.nebenLeft);
    y += 40
    this.nebenRight = this.createButton("Nebenverwandt Right (RRP)", y, this.manager.nebenRight);
    y += 40
    this.slide = this.createButton("Slide (LPR)", y, this.manager.slide);
    y += 40
    this.hexatonic = this.createButton("Hexatonic Pole (LPL)", y, this.manager.hexatonicPole);

    this.sketch.textSize(15);
    y = this.y + 29
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

  removeButtons() {
    this.leadingTone.remove()
    this.parallel.remove()
    this.relative.remove()
    this.nebenLeft.remove()
    this.nebenRight.remove()
    this.slide.remove()
    this.hexatonic.remove()
  }

  createButton(text: string, y: number, callback: () => boolean): p5.Element {
    let button = this.sketch.createButton(text);
    button.position(this.x + 30, y);
    button.style('font-size', '12px');
    button.style('padding', '5px');
    button.style('width', '190px');
    button.style('text-align', 'left');
    button.mousePressed(callback);
    return button;
  }
}
