class Player {

  // Init
  private osc1 = new p5.SinOsc();
  private osc2 = new p5.SinOsc();
  private osc3 = new p5.SinOsc();

  private readonly midi: Int[][];

  private sketch: p5;

  constructor(sketch: p5, midi: Int[][]) {
    this.sketch = sketch;
    this.midi = midi;
    this.createButton();
  }

  // toggling playback
  private playing = false;
  private button: p5.Element;

  createButton() {
    this.button = this.sketch.createButton("Play");
    this.button.position(50, 400);
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
    const root  = this.midi[major ? y : y+1][Math.floor(x/2)];
    const third = root + (major ? 4 : 3);
    const fifth = root + 7;

    this.osc1.freq(this.sketch.midiToFreq(root));
    this.osc2.freq(this.sketch.midiToFreq(third));
    this.osc3.freq(this.sketch.midiToFreq(fifth));
  }
}
