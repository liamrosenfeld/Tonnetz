class SizeManager {

  private readonly defaultTriSize = 100;
  private readonly minTriLong = 12;

  private winWidth: Float;

  private sketch: p5;

  w: Int = 12;
  h: Int = 3;
  triSize: Float = 100;

  centerX: Int = 2 * Math.floor(this.w / 4);
  centerY: Int = Math.floor(this.h / 2);
  
  constructor(sketch: p5) {
    this.sketch = sketch;
    this.calcSizes();
  }

  calcSizes() {
    // update size
    this.winWidth = this.sketch.width - 50; // factor in padding

    
    const minDefault = this.defaultTriSize * this.minTriLong / 1.5;
    if (minDefault > this.winWidth) {
      // shrink triangles (too skinny width)
      this.triSize = this.winWidth * 1.5 / this.minTriLong;
      this.w = this.minTriLong;
    } else {
      // increase width (room available)
      this.triSize = this.defaultTriSize;
      this.w = 2 * Math.floor((this.winWidth * 1.5) / this.defaultTriSize / 2);
    }

    this.centerX = 2 * Math.floor(this.w / 4);
    this.centerY = Math.floor(this.h / 2);
  }

}
