class Circles {
  
  private readonly r = 30;

  private readonly midiValues: Int[]

  private sketch: p5;


  constructor(sketch: p5, midiValues: Int[][]) {
    this.sketch = sketch;
    this.midiValues = [].concat.apply([], midiValues); // flattens
  }

  draw(points: Point[]) {

    this.sketch.noStroke();

    let midiValues = [...this.midiValues];

    points.forEach(point => {
      // draw circle
      this.sketch.fill(255);
      this.drawCircle(point);

      // text formatting
      this.sketch.fill(0);
      this.sketch.textSize(18);
      this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);

      // note name
      const midiValue = midiValues.shift();
      const noteName  = Midi.nameFromMidi(midiValue);

      // draw note name
      this.sketch.text(noteName, point.x - this.r, point.y - this.r, this.r * 2, this.r * 2);
    });

    // re-enable stroke
    this.sketch.stroke(255);
  }

  drawCircle(point: Point) {
    this.sketch.circle(point.x, point.y, this.r);
  }
}
