class Player {
  
  // MIDI Values
  private readonly midi: Int[][];

  private calcMidi(): Int[][] {
    let midi: number[][] = new Array();
    let rowStart = 43;
    for (let row = 0; row < 6; row+=1) {
      midi.push([]);
      midi[row].push(rowStart);
      for (let col = 1; col < 12; col+=1) {
        const nextNote = rowStart + (col * 7)
        midi[row].push(nextNote);
      }
      rowStart += 4;
    }
    return midi
  }
  
  // Init
  private osc1 = new p5.SinOsc();
  private osc2 = new p5.SinOsc();
  private osc3 = new p5.SinOsc();

  private sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
    this.midi = this.calcMidi();
    this.createButton();
  }

  // toggling playback
  private playing = false;
  private button: p5.Element;

  createButton() {
    this.button = this.sketch.createButton("Play");
    this.button.position(1000, 25);
    this.button.style('font-size', '12px');
    this.button.style('padding', '5px');
    this.button.style('width', '190px');
    this.button.style('text-align', 'left');
    this.button.mousePressed(this.toggle);
  }

  private toggle = () => {
    if (this.playing) {
      this.stop();
      this.button.html("Play");
      this.playing = false;
    } else {
      this.start();
      this.button.html("Pause");
      this.playing = true;
    }

    return true;
  }
  
  private start() {
    this.osc1.start();
    this.osc2.start();
    this.osc3.start();
  }

  private stop() {
    this.osc1.stop(0.1);
    this.osc2.stop(0.1);
    this.osc3.stop(0.1);
  }

  // modifications
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
