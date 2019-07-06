class MovePicker {
  private sketch: p5;
  private manager: PositionManager;

  constructor(sketch: p5, manager: PositionManager) {
    this.sketch = sketch;
    this.manager = manager;
  }

  addButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    this.sketch.text("Primary Operations", 1000, 100);
    this.createButton("A - Leading Tone", 110, this.leadingTone);
    this.createButton("S - Parallel", 150, this.parallel);
    this.createButton("D - Relative", 190, this.relative);

    this.sketch.text("Compound Operations", 1000, 280)
    this.createButton("Z - Nebenverwandt Left (LLP)", 290, this.nebenLeft);
    this.createButton("X - Nebenverwandt Right (RRP)", 330, this.nebenRight);
    this.createButton("C - Slide (LPR)", 370, this.slide);
    this.createButton("V - Haxatonic Pole (LPL)", 410, this.hexatonicPole);
  }

  createButton(text: string, y: number, callback: () => boolean) {
    let button = this.sketch.createButton(text);
    button.position(1000, y);
    button.style('font-size', '12px');
    button.style('padding', '5px');
    button.style('width', '200px');
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
