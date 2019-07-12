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
