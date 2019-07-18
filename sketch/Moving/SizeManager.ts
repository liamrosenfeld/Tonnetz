class SizeManager {

  private readonly defaultTriSize = 100;
  private readonly minTriLong = 12;

  private winWidth: Float;

  private sketch: p5;

  w: Float = 12;
  h: Float = 3;
  triSize: Float = 100;
  
  constructor(sketch: p5) {
    this.sketch = sketch;
    this.calcSizes();
  }

  calcSizes() {
    // update size
    this.winWidth = this.sketch.width - 50; // factor in padding

    // shrink triangles (too skinny width)
    const minDefault = this.defaultTriSize * this.minTriLong / 1.5;
    if (minDefault > this.winWidth) {
      this.triSize = this.winWidth * 1.5 / this.minTriLong;
      this.w = this.minTriLong;
      return;
    }

    // increase width (room available)
    this.triSize = this.defaultTriSize;
    this.w = 2 * Math.floor((this.winWidth * 1.5) / this.defaultTriSize / 2);
  }

}
