class DemoPicker {

  private sketch: p5;
  private manager: PositionManager;

  constructor(sketch: p5, manager: PositionManager) {
    this.sketch = sketch;
    this.manager = manager;
  }

  drawButtons() {
    this.sketch.text("Examples", 700, 500);
    this.createButton("Brahms Opus 102", 510, this.brahms);
  }

  createButton(text: string, y: number, callback: () => boolean) {
    let button = this.sketch.createButton(text);
    button.position(700, y);
    button.style('font-size', '12px');
    button.style('padding', '5px');
    button.style('width', '190px');
    button.style('text-align', 'left');
    button.mousePressed(callback);
  }

  private brahms = () => {
    const test = new Recording(this.manager);
    test.playDemo(brahms102);
    return true;
  }

}
