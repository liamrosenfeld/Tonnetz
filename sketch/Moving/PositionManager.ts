class PositionManager {
  //// setup ////
  // size
  private w: Int = 12;
  private h: Int = 3;

  // selected
  private x: Int = 0;
  private y: Int = 0;

  // managed
  readonly lattice: Lattice;
  readonly player: Player;
  readonly recorder: Recorder;

  private sketch: p5;

  constructor(sketch: p5) {
    const midi = Midi.calcMidi(this.w, this.h);
    this.lattice  = new Lattice(sketch, this.w, this.h, midi);
    this.player   = new Player(sketch, midi);
    this.recorder = new Recorder(sketch, this);
    this.sketch   = sketch;
    this.update();
  }

  //// private ////
  // primary
  private _leadingTone = () => {
    // move left
    this.x -= 1;

    if (this.x < 0) {
      return false;
    }

    return true
  }

  private _parallel = () => {
    // move vertically
    if (this.x % 2 == 0) {
      // even (needs to check if would pass top)
      if (this.y - 1 >= 0) {
        this.y -= 1;
        this.x += 1;
      } else {
        this.y = this.h - 1;
        this.x += 1;
      }
    } else {
      // odd (needs to check if would pass base)
      if (this.y + 1 < this.h) {
        this.y += 1;
        this.x -= 1;
      } else {
        this.y = 0;
        this.x -= 1;
      }
    }

    return true;
  }

  private _relative = () => {
    // move right
    this.x += 1;

    if (this.x >= this.w) {
      return false;
    }

    return true
  }

  private moveOrDie(move: () => boolean): boolean {
    // try move
    const success = move();

    // abort?
    if (!success) {
      // resets stored position to last update
      this.revert();

      // update lattice
      this.lattice.error = true;
      this.sketch.redraw();

      // under after 200 milliseconds
      setTimeout((function() {
        this.lattice.error = false;
        this.sketch.redraw();
      }).bind(this), 200);
    }

    // pass on
    return success;
  }

  // sync managed
  private update() {
    this.lattice.selectedX = this.x;
    this.lattice.selectedY = this.y;
    this.player.setTriPosition(this.x, this.y);
    this.lattice.error = false;
    this.sketch.redraw();
  }

  private revert() {
    this.x = this.lattice.selectedX;
    this.y = this.lattice.selectedY;
  }

  //// public ///
  leadingTone = () => {
    if (this.moveOrDie(this._leadingTone)) {
      this.update();
      this.recorder.addMove(Move.LeadingTone);
    }
    return true;
  }

  parallel = () => {
    if (this.moveOrDie(this._parallel)) {
      this.update();
      this.recorder.addMove(Move.Parallel);
    }
    return true;
  }

  relative = () => {
    if (this.moveOrDie(this._relative)) {
      this.update();
      this.recorder.addMove(Move.Relative);
    }
    return true;
  }

  nebenLeft = () => {
    if (!this.moveOrDie(this._leadingTone)) { return }
    if (!this.moveOrDie(this._leadingTone)) { return }
    if (!this.moveOrDie(this._parallel)) { return }

    this.update();
    this.recorder.addMove(Move.NebenLeft);
    return true;
  }

  nebenRight = () => {
    if (!this.moveOrDie(this._relative)) { return }
    if (!this.moveOrDie(this._relative)) { return }
    if (!this.moveOrDie(this._parallel)) { return }

    this.update();
    this.recorder.addMove(Move.NebenRight);
    return true;
  }

  slide = () => {
    if (!this.moveOrDie(this._leadingTone)) { return }
    if (!this.moveOrDie(this._parallel)) { return }
    if (!this.moveOrDie(this._relative)) { return }

    this.update();
    this.recorder.addMove(Move.Slide);
    return true;
  }

  hexatonicPole = () => {
    if (!this.moveOrDie(this._leadingTone)) { return }
    if (!this.moveOrDie(this._parallel)) { return }
    if (!this.moveOrDie(this._leadingTone)) { return }

    this.update();
    this.recorder.addMove(Move.HexatonicPole);
    return true;
  }

  teleport(x: Int, y: Int) {
    this.x = x;
    this.y = y;

    this.update();
    this.recorder.addMove({x: x, y: y});
  }

  // getters
  get getX() { return this.x };
  get getY() { return this.y };
}
