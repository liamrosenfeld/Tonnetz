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
    let points: Point[] = new Array();
    let tempPoints: Point[] = new Array();
    let tri: EqTriangle;
    
    this.sketch.stroke(200);
    
    for (let currentH: Int = 0; currentH < this.h; currentH++) {
      // first one in row
      let up = false;
      tri = new EqTriangle(nextRowStart, this.triSize, up);

      // color if selected
      const selected = (0 == this.selectedX && currentH == this.selectedY)
      this.sketch.fill(selected ? 150 : 0);

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
        this.sketch.fill(selected ? 150 : 0);

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

class Circles {
  readonly noteNames = [
    "A𝄫", "E𝄫", "B𝄫", "F♭", "C♭", "G♭", "D♭",
    "C♭", "G♭", "D♭", "A♭", "E♭", "B♭", "F",
    "E♭", "B♭", "F",  "C",  "G",  "D",  "A",
    "G",  "D",  "A",  "E",  "B",  "F#", "C#",
    "B",  "F#", "C#", "G#", "D#", "A#", "E#",
    "D#", "A#", "E#", "B#", "F𝄪",  "C𝄪", "G𝄪"
  ]

  private readonly r = 30;

  private sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
  }

  draw(points: Point[]) {
    this.sketch.noStroke();

    for (let i = 0; i < points.length; i++) {
      const point = points[i]

      this.sketch.fill(300);
      this.drawCircle(point);

      this.sketch.fill(0);
      this.sketch.textSize(18);
      this.sketch.text(this.noteNames[i], point.x - 10, point.y + 5);
    }

    this.sketch.stroke(300);
  }

  drawCircle(point: Point) {
    this.sketch.circle(point.x, point.y, this.r);
  }
}