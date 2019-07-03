class Player {
  private readonly midi = [
    [67, 62, 69, 64, 71, 66, 61],
    [71, 66, 61, 68, 63, 70, 65],
    [63, 70, 65, 60, 67, 62, 69],
    [67, 62, 69, 64, 71, 66, 61],
    [71, 66, 61, 68, 63, 70, 65],
    [63, 70, 65, 60, 67, 71, 72]
  ]
  
  private freq(): number[][] {
    let freq: number[][] = [[]];
    for (let i = 0; i < this.midi.length; i++) {
      freq.push([]);
      for (let j = 0; j < this.midi[0].length; j++) {
        freq[i].push(this.sketch.midiToFreq(this.midi[i][j]));
      }
    }
    return freq
  }
  
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
    const freqs = this.freq();
  
    if (x % 2 == 0) {
      let floored = Math.floor(x/2);
      this.osc1.freq(freqs[y][floored]);
      this.osc2.freq(freqs[y][floored + 1]);
      this.osc3.freq(freqs[y + 1][floored]);
    } else {
      let floored = Math.floor(x/2);
      this.osc1.freq(freqs[y][floored + 1]);
      this.osc2.freq(freqs[y + 1][floored + 1]);
      this.osc3.freq(freqs[y + 1][floored]);
    }
  }
}
