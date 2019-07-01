void setup() {
  size(1000, 500);
  background(51);
}

void draw() {
  lattice.draw();
}

void keyPressed() {
  if (key == 's') {
    lattice.moveVertically();
  } else if (key == 'a') {
    lattice.moveLeft();
  } else if (key == 'd') {
    lattice.moveRight();
  }
}

Lattice lattice = new Lattice(12, 5);

class Lattice {
  // properties
  private int w;
  private int h;

  private int selectedX = 0;
  private int selectedY = 0;

  // Init
  public Lattice(int w, int h) {
    this.w = w;
    this.h = h;
  }

  // Drawing
  void draw() {
    Point nextRowStart = new Point();
    EqTriangle tri = new EqTriangle(new Point(), 0, false); // filler
    final float triSize = 100;
    stroke(153);
    
    for (int currentH = 0; currentH < h; currentH++) {
      // first one in row
      boolean up = false;
      tri = new EqTriangle(nextRowStart, triSize, up);
      if (0 == selectedX && currentH == selectedY) {
        fill(150);
        tri.draw();
        fill(0);
      } else {
        tri.draw();
      }
      nextRowStart = tri.getMiddlePoint();
      
      // rest of row
      Point nextHorPoint = tri.getMiddlePoint();
      for (int currentW = 1; currentW < w; currentW++) {
        up = !up;
        tri = new EqTriangle(nextHorPoint, triSize, up);
        if (currentW == selectedX && currentH == selectedY) {
          fill(150);
          tri.draw();
          fill(0);
        } else {
          tri.draw();
        }
        nextHorPoint = tri.getMiddlePoint();
      }
    }
  }

  // interactions
  public void moveLeft() {
    selectedX -= 1;
    println(selectedX);
    if (selectedX < 0) {
      selectedX = w - 1;
    }
  }

  public void moveRight() {
    selectedX += 1;
    println(selectedX);
    if (selectedX >= w) {
      selectedX = 0;
    }
  }

  public void moveVertically() {
    if (selectedX % 2 == 0) {
      if (selectedY - 1 >= 0) {
        selectedY -= 1;
        selectedX += 1;
      }
    } else if (selectedY + 1 < h) {
      selectedY +=1;
      selectedX -= 1;
    }
    
    
  }
}



class Point {
  public float x;
  public float y;
  
  public Point(float x, float y) {
    this.x = x;
    this.y = y;
  }
  
  public Point() {
    this.x = 0;
    this.y = 0;
  }
  
  public String toString() {
    return "(" + x + ", " + "y" + ")";
  }
}

class EqTriangle {
  // properties
  private Point leftPoint;
  private Point middlePoint;
  private Point rightPoint;

  // init
  public EqTriangle(Point leftPoint, float triSize, boolean up) {
    this.leftPoint = leftPoint;
    this.rightPoint = new Point(leftPoint.x + triSize, leftPoint.y);
    this.middlePoint = calcMiddlePoint(up);
  }

  public Point calcMiddlePoint(boolean up) {
    Point middle = new Point();
    float sqrt3 = sqrt(3);

    if (up) { // this is opposite because the canvas is not like normal math
      middle.x = ((leftPoint.x + rightPoint.x) - (sqrt3 * (rightPoint.y - leftPoint.y))) / 2;
      middle.y = ((leftPoint.y + rightPoint.y) - (sqrt3 * (rightPoint.x - leftPoint.x))) / 2;
    } else {
      middle.x = ((leftPoint.x + rightPoint.x) + (sqrt3 * (rightPoint.y - leftPoint.y))) / 2;
      middle.y = ((leftPoint.y + rightPoint.y) + (sqrt3 * (rightPoint.x - leftPoint.x))) / 2;
    }
    
    return middle;
  }

  // methods
  public void draw() {
    triangle(leftPoint.x, leftPoint.y,
             middlePoint.x, middlePoint.y,
             rightPoint.x, rightPoint.y);
  }

  // getters
  public Point getLeftPoint() {
    return leftPoint;
  }

  public Point getMiddlePoint() {
    return middlePoint;
  }

  public Point getRightPoint() {
    return rightPoint;
  }

}