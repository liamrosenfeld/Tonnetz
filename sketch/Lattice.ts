class Lattice {
  // properties
  private w: Int;
  private h: Int;

  private selectedX: Int = 0;
  private selectedY: Int = 0;

  private triSize = 100;

  // Init
  constructor(w: Int, h: Int) {
    this.w = w;
    this.h = h;
  }

  // Drawing
  draw() {
    let nextRowStart = Point.zero();
    let tri = new EqTriangle(Point.zero(), 0, false); // filler
    
    stroke(200);
    
    for (let currentH: Int = 0; currentH < this.h; currentH++) {
      // first one in row
      let up = false;
      tri = new EqTriangle(nextRowStart, this.triSize, up);
      if (0 == this.selectedX && currentH == this.selectedY) {
        fill(150);
        tri.draw();
        fill(0);
      } else {
        tri.draw();
      }
      nextRowStart = tri.middlePoint.copy();
      
      // rest of row
      let nextHorPoint = tri.middlePoint.copy();
      for (let currentW: Int = 1; currentW < this.w; currentW++) {
        up = !up;
        tri = new EqTriangle(nextHorPoint, this.triSize, up);
        if (currentW == this.selectedX && currentH == this.selectedY) {
          fill(150);
          tri.draw();
          fill(0);
        } else {
          tri.draw();
        }
        nextHorPoint = tri.middlePoint;
      }
    }
  }

  // interactions
  moveLeft() {
    this.selectedX -= 1;
    if (this.selectedX < 0) {
      this.selectedX = this.w - 1;
    }
  }

  moveRight() {
    this.selectedX += 1;
    if (this.selectedX >= this.w) {
      this.selectedX = 0;
    }
  }

  moveVertically() {
    if (this.selectedX % 2 == 0) {
      if (this.selectedY - 1 >= 0) {
        this.selectedY -= 1;
        this.selectedX += 1;
      }
    } else if (this.selectedY + 1 < this.h) {
      this.selectedY +=1;
      this.selectedX -= 1;
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
    const sqrt3 = sqrt(3);

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
  draw() {
    triangle(
      this.leftPoint.x, this.leftPoint.y,
      this.middlePoint.x, this.middlePoint.y,
      this.rightPoint.x, this.rightPoint.y
    );
  }

  toString(): string {
    return `${this.leftPoint}  -- ${this.middlePoint} -- ${this.rightPoint}`;
  }
}