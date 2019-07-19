class Player {
  // Init
  private osc1 = new p5.SinOsc();
  private osc2 = new p5.SinOsc();
  private osc3 = new p5.SinOsc();

  private sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
  }

  // toggling playback
  private playing = false;
  get getPlaying() { return this.playing }

  start() {
    this.osc1.start();
    this.osc2.start();
    this.osc3.start();
    this.playing = true;
  }

  stop() {
    this.osc1.stop(0.1);
    this.osc2.stop(0.1);
    this.osc3.stop(0.1);
    this.playing = false;
  }

  setPitches(pitches: Pitches) {
    console.log(pitches.toString());
    this.osc1.freq(this.sketch.midiToFreq(pitches.getRoot));
    this.osc2.freq(this.sketch.midiToFreq(pitches.getThird));
    this.osc3.freq(this.sketch.midiToFreq(pitches.getFifth));
  }
}
