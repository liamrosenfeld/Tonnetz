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
      const point = points[i];

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