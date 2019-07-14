class Circles {
  readonly noteNames = [
    "A𝄫", "E𝄫", "B𝄫", "Fb", "Cb", "Gb", "Db",
    "Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F",
    "Eb", "Bb", "F",  "C",  "G",  "D",  "A",
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
      const point = points[i];

      this.sketch.fill(300);
      this.drawCircle(point);

      this.sketch.fill(0);
      this.sketch.textSize(18);
      this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
      this.sketch.text(this.noteNames[i], point.x - this.r, point.y - this.r, this.r * 2, this.r * 2);
      this.sketch.fill(0, 0, 300);
      
    }

    this.sketch.stroke(300);
  }

  drawCircle(point: Point) {
    this.sketch.circle(point.x, point.y, this.r);
  }
}
