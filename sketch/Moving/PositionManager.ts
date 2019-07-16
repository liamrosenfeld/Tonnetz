class PositionManager {
  //// setup ////
  // size
  private w: Int = 12;
  private h: Int = 4;

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
  private _leadingTone() {
    // move left
    this.x -= 1;

    if (this.x < 0) {
      this.x = this.w - 1;
    }

    this.recorder.addMove(Move.LeadingTone);
  }

  private _parallel = () => {
    // move vertically
    let success = false;

    if (this.x % 2 == 0) {
      // even (needs to check if would pass base)
      if ((this.y - 1 >= 0)) {
        this.y -= 1;
        this.x += 1;
        success = true;
      }
    } else if (this.y + 1 < this.h) {
      // odd (needs to check if would pass top)
      this.y +=1;
      this.x -= 1;
      success = true;
    }

    if (success) {
      this.recorder.addMove(Move.Parallel)
    }

    return success;
  }

  private _relative() {
    // move right
    this.x += 1;

    if (this.x >= this.w) {
      this.x = 0;
    }

    this.recorder.addMove(Move.Relative);
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

  // secondary
  private _nebenLeft() {
    this._leadingTone();
    this._leadingTone();
    if (!this.moveOrDie(this._parallel)) { return }
    this.update();
  }

  private _nebenRight() {
    this._relative();
    this._relative();
    if (!this.moveOrDie(this._parallel)) { return }
    this.update();
  }

  private _slide() {
    this._leadingTone();
    if (!this.moveOrDie(this._parallel)) { return }
    this._relative();
    this.update();
  }

  private _hexatonicPole() {
    this._leadingTone();
    if (!this.moveOrDie(this._parallel)) { return }
    this._leadingTone();
    this.update();
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
    this._leadingTone();
    this.update();
    return true;
  }

  parallel = () => {
    if (this.moveOrDie(this._parallel)) {
      this.update();
    }
    return true;
  }

  relative = () => {
    this._relative();
    this.update();
    return true;
  }

  nebenLeft = () => {
    this._nebenLeft();
    return true;
  }

  nebenRight = () => {
    this._nebenRight();
    return true;
  }

  slide = () => {
    this._slide();
    return true;
  }

  hexatonicPole = () => {
    this._hexatonicPole();
    return true;
  }

  teleport(x: Int, y: Int) {
    this.x = x;
    this.y = y;
    this.update();
  }

  // getters
  get getX() { return this.x };
  get getY() { return this.y };
}
