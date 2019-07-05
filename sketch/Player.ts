class Player {
  private readonly midi = [
    [67, 62, 69, 64, 71, 66, 61],
    [71, 66, 61, 68, 63, 70, 65],
    [63, 70, 65, 60, 67, 62, 69],
    [67, 62, 69, 64, 71, 66, 61],
    [71, 66, 61, 68, 63, 70, 65],
    [63, 70, 65, 60, 67, 71, 72]
  ]
  
  private osc1 = new p5.SinOsc();
  private osc2 = new p5.SinOsc();
  private osc3 = new p5.SinOsc();

  private sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
  }
  
  play() {
    this.osc1.start()
    this.osc2.start()
    this.osc3.start()
  }

  setTriPosition(x: Int, y: Int) {
    const major = (x % 2 == 0);
    const root  = major ? this.midi[y][Math.floor(x/2)] : this.midi[y+1][Math.floor(x/2)];
    const third = root + (major ? 4 : 3);
    const fifth = root + 7;

    this.osc1.freq(this.sketch.midiToFreq(root));
    this.osc2.freq(this.sketch.midiToFreq(third));
    this.osc3.freq(this.sketch.midiToFreq(fifth));
  }
}
