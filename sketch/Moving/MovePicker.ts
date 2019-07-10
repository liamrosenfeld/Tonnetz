class MovePicker {
  private sketch: p5;
  private manager: PositionManager;

  constructor(sketch: p5, manager: PositionManager) {
    this.sketch = sketch;
    this.manager = manager;
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    this.sketch.text("Primary Operations", 1000, 100);
    this.createButton("Leading Tone", 110, this.leadingTone);
    this.createButton("Parallel", 150, this.parallel);
    this.createButton("Relative", 190, this.relative);

    this.sketch.text("Compound Operations", 1000, 280)
    this.createButton("Nebenverwandt Left (LLP)", 290, this.nebenLeft);
    this.createButton("Nebenverwandt Right (RRP)", 330, this.nebenRight);
    this.createButton("Slide (LPR)", 370, this.slide);
    this.createButton("Haxatonic Pole (LPL)", 410, this.hexatonicPole);

    this.sketch.textSize(15);
    this.sketch.text("A", 1010, 129);
    this.sketch.text("S", 1010, 169);
    this.sketch.text("D", 1010, 209);
    this.sketch.text("Z", 1010, 309);
    this.sketch.text("X", 1010, 349);
    this.sketch.text("C", 1010, 389);
    this.sketch.text("V", 1010, 429);
  }

  createButton(text: string, y: number, callback: () => boolean) {
    let button = this.sketch.createButton(text);
    button.position(1030, y);
    button.style('font-size', '12px');
    button.style('padding', '5px');
    button.style('width', '190px');
    button.style('text-align', 'left');
    button.mousePressed(callback);
  }
  
  leadingTone = () => {
    this.manager.leadingTone();
    this.manager.update();
    return true;
  }

  parallel = () => {
    this.manager.parallel();
    this.manager.update();
    return true;
  }

  relative = () => {
    this.manager.relative();
    this.manager.update();
    return true;
  }

  nebenLeft = () => {
    this.manager.nebenLeft();
    this.manager.update();
    return true;
  }

  nebenRight = () => {
    this.manager.nebenRight();
    this.manager.update();
    return true;
  }

  slide = () => {
    this.manager.slide();
    this.manager.update();
    return true;
  }

  hexatonicPole = () => {
    this.manager.hexatonicPole();
    this.manager.update();
    return true;
  }
}
