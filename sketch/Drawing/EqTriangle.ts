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

  // drawing
  draw(sketch: p5) {
    sketch.triangle(
      this.leftPoint.x, this.leftPoint.y,
      this.middlePoint.x, this.middlePoint.y,
      this.rightPoint.x, this.rightPoint.y
    );
  }

  // debugging
  toString(): string {
    return `${this.leftPoint}  -- ${this.middlePoint} -- ${this.rightPoint}`;
  }
}