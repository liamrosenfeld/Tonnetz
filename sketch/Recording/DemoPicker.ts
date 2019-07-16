class DemoPicker {

  private sketch: p5;
  private manager: PositionManager;

  private brahmsButton: p5.Element;

  x: Float
  y: Float

  constructor(sketch: p5, manager: PositionManager, x: Float, y: Float) {
    this.sketch = sketch;
    this.manager = manager;

    this.x = x;
    this.y = y;
  }

  drawButtons() {
    let y = this.y
    this.sketch.text("Examples", this.x, y);
    y += 10
    this.brahmsButton = this.createButton("Brahms Opus 102", y, this.brahms);
  }

  createButton(text: string, y: number, callback: () => boolean): p5.Element {
    let button = this.sketch.createButton(text);
    button.position(this.x, y);
    button.style('font-size', '12px');
    button.style('padding', '5px');
    button.style('width', '190px');
    button.style('text-align', 'left');
    button.mousePressed(callback);
    return button;
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
