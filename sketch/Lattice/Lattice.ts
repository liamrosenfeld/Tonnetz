class Lattice {
  // properties
  private w: Int;
  private h: Int;

  selectedX: Int = 0;
  selectedY: Int = 0;

  error: boolean;

  private triSize = 100;

  private sketch: p5;

  // Init
  constructor(sketch: p5, w: Int, h: Int) {
    this.sketch = sketch;
    this.w = w;
    this.h = h;
    this.error = false;
  }

  // Drawing
  // mega function... whoops
  draw() {
    let nextRowStart = new Point(25, 25); // padding
    let points: Point[] = new Array();
    let tempPoints: Point[] = new Array();
    let tri: EqTriangle;
    
    this.sketch.stroke(200);
    
    for (let currentH: Int = 0; currentH < this.h; currentH++) {
      // first one in row
      let up = false;
      tri = new EqTriangle(nextRowStart, this.triSize, up);

      // get colors
      const selectedColor = this.sketch.color(this.error ? "#b30000" : "	#A9A9A9");
      const normalColor   = this.sketch.color(10);

      // color if selected
      const selected = (0 == this.selectedX && currentH == this.selectedY)
      this.sketch.fill(selected ? selectedColor : normalColor);

      // draw and setup next row
      tri.draw(this.sketch);
      nextRowStart = tri.middlePoint.copy();

      // get points
      points.push(tri.leftPoint);
      
      // rest of row
      let nextHorPoint = tri.middlePoint.copy();
      for (let currentW: Int = 1; currentW < this.w; currentW++) {
        // assemble triangle
        up = !up;
        tri = new EqTriangle(nextHorPoint, this.triSize, up);

        // color if selected
        const selected = (currentW == this.selectedX && currentH == this.selectedY)
        this.sketch.fill(selected ? selectedColor : normalColor);

        // draw and setup for next
        tri.draw(this.sketch);
        nextHorPoint = tri.middlePoint;

        // get points
        if (up) {
          points.push(tri.middlePoint);

          if (currentH == this.h - 1) {
            if (currentW == 1) {
              tempPoints.push(tri.leftPoint);
            }
            tempPoints.push(tri.rightPoint);
          }
        }
      }

      points = points.concat(tempPoints);
      let circles = new Circles(this.sketch)
      circles.draw(points);
    }
  }
}
