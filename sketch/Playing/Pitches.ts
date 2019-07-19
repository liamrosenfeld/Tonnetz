class Pitches {
  private root: Int;
  private third: Int;
  private fifth: Int;

  midi: Int[][];

  constructor(midi: Int[][]) {
    this.midi = midi;
    this.resetTo(0, 0);
  }

  // modifications
  override(root: Int, third: Int, fifth: Int) {
    this.root = root;
    this.third = third;
    this.fifth = fifth;
  }

  resetTo(x: Int, y: Int) {
    const major = (x % 2 == 0);
    this.root = this.midi[major ? y : y + 1][Math.floor(x / 2)];
    this.third = this.root + (major ? 4 : 3);
    this.fifth = this.root + 7;
  }

  parallel(major: boolean) {
    this.third += major ? -1 : 1;
  }

  relative(major: boolean) {
    const oldRoot = this.root;
    const oldThird = this.third;
    const oldFifth = this.fifth;

    if (major) {
      this.root = oldFifth + 2;
      this.third = oldRoot;
      this.fifth = oldThird;
    } else {
      this.root = oldThird;
      this.third = oldFifth;
      this.fifth = oldRoot - 2;
    }
  }

  leadingTone(major: boolean) {
    const oldRoot = this.root;
    const oldThird = this.third;
    const oldFifth = this.fifth;

    if (major) {
      this.root = oldThird;
      this.third = oldFifth;
      this.fifth = oldRoot - 1;
    } else {
      this.root = oldFifth + 1;
      this.third = oldRoot;
      this.fifth = oldThird;
    }
  }

  // getters
  get getRoot()  { return this.root }
  get getThird() { return this.third }
  get getFifth() { return this.fifth }

  toString() {
    return `
    root:  ${this.root} (${Midi.nameFromMidi(this.root)})
    third: ${this.third} (${Midi.nameFromMidi(this.third)})
    fifth: ${this.fifth} (${Midi.nameFromMidi(this.fifth)})
    `;
  }
}
