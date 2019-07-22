class PositionManager {
  //// setup ////
  // size
  private w: Int;
  private h: Int;

  private sizeManager: SizeManager;

  // selected
  private x: Int = 0;
  private y: Int = 0;

  // managed
  lattice:  Lattice;
  player:   Player;
  pitches:  Pitches;
  recorder: Recorder;

  private sketch: p5;

  constructor(sketch: p5, sizeManager: SizeManager) {
    this.w = sizeManager.w;
    this.h = sizeManager.h;

    this.x = sizeManager.centerX;
    this.y = sizeManager.centerY;

    this.lattice  = new Lattice(sketch, sizeManager);
    this.pitches  = new Pitches(Midi.calcMidi(this.w, this.h));
    this.player   = new Player(this.pitches);
    this.recorder = new Recorder(sketch, this);

    this.sketch      = sketch;
    this.sizeManager = sizeManager;

    this.pitches.resetTo(this.x, this.y);

    this.update();
  }

  newSize(newMiddle: boolean) {
    // update sizes
    this.w = this.sizeManager.w;
    this.h = this.sizeManager.h;

    // set location back to center
    this.x = this.sizeManager.centerX;
    this.y = this.sizeManager.centerY;

    // update managed
    this.lattice.newSize(); // already connected to sizeManager
    this.pitches.midi = Midi.calcMidi(this.w, this.h);
    if (newMiddle) {
      this.pitches.resetTo(this.x, this.y);
    }

    this.updateOptPlay(newMiddle);
  }

  //// private ////
  // sync managed
  private backupX: Int;
  private backupY: Int;
  private backupRoot: Int;
  private backupThird: Int;
  private backupFifth: Int;

  private update() {
    this.updateOptPlay(true);
  }

  private updateOptPlay(play: boolean) {
    // backup
    this.backupX = this.x;
    this.backupY = this.y;
    this.backupRoot  = this.pitches.getRoot;
    this.backupThird = this.pitches.getThird;
    this.backupFifth = this.pitches.getFifth;

    // update
    this.lattice.selectedX = this.x;
    this.lattice.selectedY = this.y;
    if (play) { this.player.play() }
    this.lattice.error = false;
    this.sketch.redraw();
  }

  private revert() {
    this.x = this.backupX;
    this.y = this.backupY;

    this.pitches.override(this.backupRoot, this.backupThird, this.backupFifth);
  }

  // primary
  major(): boolean { return this.x % 2 == 0 };

  private _leadingTone = () => {
    this.pitches.leadingTone(this.major());

    this.x += this.major() ? 1 : -1;

    console.log("leading tone");

    return this.x >= 0 && this.x < this.w;
  }

  private _parallel = () => {
    // move vertically
    this.pitches.parallel(this.major());


    if (this.major()) {
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

    console.log("parallel");

    return true;
  }

  private _relative = () => {
    this.pitches.relative(this.major());

    this.x += this.major() ? -1 : 1;

    console.log("relative");

    return this.x >= 0 && this.x < this.w;
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

      // undo after 200 milliseconds
      setTimeout((function() {
        this.lattice.error = false;
        this.sketch.redraw();
      }).bind(this), 200);
    }

    // pass on
    return success;
  }

  // secondary
  private _nebenRLP = () => {
    if (!this.moveOrDie(this._relative))    { return false }
    if (!this.moveOrDie(this._leadingTone)) { return false }
    if (!this.moveOrDie(this._parallel))    { return false }
    return true;
  }

  private _nebenPRL = () => {
    if (!this.moveOrDie(this._parallel))    { return false }
    if (!this.moveOrDie(this._relative))    { return false }
    if (!this.moveOrDie(this._leadingTone)) { return false }
    return true;
  }

  //// public ////
  left = () => {
    let success = false;
    if (this.major()) {
      // major (even)
      success = this.moveOrDie(this._relative);
    } else {
      // minor (odd)
      success = this.moveOrDie(this._leadingTone);
    }

    if (success) {
      this.update();
      this.recorder.addMove(Move.Left);
    }
    
    return success;
  }

  parallel = () => {
    if (this.moveOrDie(this._parallel)) {
      this.update();
      this.recorder.addMove(Move.Parallel);
    }
    return true;
  }

  right = () => {
    let success = false;
    if (this.major()) {
      // major (even)
      success = this.moveOrDie(this._leadingTone);
    } else {
      // minor (odd)
      success = this.moveOrDie(this._relative);
    }

    if (success) {
      this.update();
      this.recorder.addMove(Move.Right);
    }
    
    return success;
  }

  nebenLeft = () => {
    let success = false; 
    if (this.major()) {
      success = this._nebenRLP();
    } else {
      success = this._nebenPRL();
    }

    if (success) {
      this.update();
      this.recorder.addMove(Move.NebenLeft);
    }
    
    return true;
  }

  nebenRight = () => {
    let success = false; 
    if (this.major()) {
      success = this._nebenPRL();
    } else {
      success = this._nebenRLP();
    }

    if (success) {
      this.update();
      this.recorder.addMove(Move.NebenRight);
    }

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

    this.pitches.resetTo(x, y);

    this.update();
    this.recorder.addMove({x: x, y: y});
  }

  // getters
  get getX() { return this.x };
  get getY() { return this.y };
}
