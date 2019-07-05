class Player {
  
  private readonly midi: Int[][];

  private calcMidi(): Int[][] {
    const rowStart = [43, 47, 51, 55, 59, 63];

    let midi: number[][] = new Array();
    for (let row = 0; row < rowStart.length; row+=1) {
      midi.push([]);
      midi[row].push(rowStart[row]);
      for (let col = 1; col < 12; col+=1) {
        const nextNote = rowStart[row] + (col * 7)
        midi[row].push(nextNote);
      }
    }
    return midi
  }
  
  private osc1 = new p5.SinOsc();
  private osc2 = new p5.SinOsc();
  private osc3 = new p5.SinOsc();

  private sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
    this.midi = this.calcMidi();
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
