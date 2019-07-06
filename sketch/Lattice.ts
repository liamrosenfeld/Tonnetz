class Lattice {
  // properties
  private w: Int;
  private h: Int;

  selectedX: Int = 0;
  selectedY: Int = 0;

  private triSize = 100;

  private sketch: p5;

  // Init
  constructor(sketch: p5, w: Int, h: Int) {
    this.sketch = sketch;
    this.w = w;
    this.h = h;
  }

  // Drawing
  draw() {
    let nextRowStart = new Point(10, 15); // padding
    let tri: EqTriangle;
    
    this.sketch.stroke(200);
    
    for (let currentH: Int = 0; currentH < this.h; currentH++) {
      // first one in row
      let up = false;
      tri = new EqTriangle(nextRowStart, this.triSize, up);
      if (0 == this.selectedX && currentH == this.selectedY) {
        this.sketch.fill(150);
        tri.draw(this.sketch);
        this.sketch.fill(0);
      } else {
        tri.draw(this.sketch);
      }
      nextRowStart = tri.middlePoint.copy();
      
      // rest of row
      let nextHorPoint = tri.middlePoint.copy();
      for (let currentW: Int = 1; currentW < this.w; currentW++) {
        up = !up;
        tri = new EqTriangle(nextHorPoint, this.triSize, up);
        if (currentW == this.selectedX && currentH == this.selectedY) {
          this.sketch.fill(150);
          tri.draw(this.sketch);
          this.sketch.fill(0);
        } else {
          tri.draw(this.sketch);
        }
        nextHorPoint = tri.middlePoint;
      }
    }
  }
}

class Point {
  public x: Float;
  public y: Float;
  
  constructor(x: Float, y: Float) {
    this.x = x;
    this.y = y;
  }
  
  static zero(): Point {
    return new Point(0, 0);
  }

  copy(): Point {
    return new Point(this.x, this.y);
  }
  
  public toString(): string {
    return "(" + this.x + ", " + this.y + ")";
  }
}

class EqTriangle {
  // properties
  readonly leftPoint:   Point;
  readonly middlePoint: Point;
  readonly rightPoint:  Point;

  // init
  constructor(leftPoint: Point, triSize: Float, up: boolean) {
    this.leftPoint = leftPoint;
    this.rightPoint = new Point(leftPoint.x + triSize, leftPoint.y);
    this.middlePoint = this.calcMiddlePoint(up);
  }

  public calcMiddlePoint(up: boolean): Point {
    let middle = Point.zero();
    const sqrt3 = Math.sqrt(3);

    if (up) { // this is opposite because the canvas is not like normal math
      middle.x = ((this.leftPoint.x + this.rightPoint.x) - (sqrt3 * (this.rightPoint.y - this.leftPoint.y))) / 2;
      middle.y = ((this.leftPoint.y + this.rightPoint.y) - (sqrt3 * (this.rightPoint.x - this.leftPoint.x))) / 2;
    } else {
      middle.x = ((this.leftPoint.x + this.rightPoint.x) + (sqrt3 * (this.rightPoint.y - this.leftPoint.y))) / 2;
      middle.y = ((this.leftPoint.y + this.rightPoint.y) + (sqrt3 * (this.rightPoint.x - this.leftPoint.x))) / 2;
    }
    
    return middle;
  }

  // methods
  draw(sketch: p5) {
    sketch.triangle(
      this.leftPoint.x, this.leftPoint.y,
      this.middlePoint.x, this.middlePoint.y,
      this.rightPoint.x, this.rightPoint.y
    );
  }

  toString(): string {
    return `${this.leftPoint}  -- ${this.middlePoint} -- ${this.rightPoint}`;
  }
}