class PositionManager {
  // size
  private w: Int = 12;
  private h: Int = 5;

  // selected
  private x: Int = 0;
  private y: Int = 0;

  // managed
  readonly lattice: Lattice;
  readonly player: Player;

  constructor(sketch: p5) {
    this.lattice = new Lattice(sketch, this.w, this.h);
    this.player  = new Player(sketch);
  }

  // primary
  leadingTone() {
    // move left
    this.x -= 1;
    if (this.x < 0) {
      this.x = this.w - 1;
    }
  }

  parallel() {
    // move vertically
    if (this.x % 2 == 0) {
      if (this.y - 1 >= 0) {
        this.y -= 1;
        this.x += 1;
      }
    } else if (this.y + 1 < this.h) {
      this.y +=1;
      this.x -= 1;
    }
  }

  relative() {
    // move right
    this.x += 1;
    if (this.x >= this.w) {
      this.x = 0;
    }
  }

  // secondary
  nebenLeft() {
    this.leadingTone();
    this.leadingTone();
    this.parallel();
  }

  nebenRight() {
    this.relative();
    this.relative();
    this.parallel();
  }

  slide() {
    this.leadingTone();
    this.parallel();
    this.relative();
  }

  hexatonicPole() {
    this.leadingTone();
    this.parallel();
    this.leadingTone();
  }

  // NOTE: MUST BE CALLED TO UPDATE MANAGED
  update() {
    this.lattice.selectedX = this.x;
    this.lattice.selectedY = this.y;
    this.player.setTriPosition(this.x, this.y);
  }


}