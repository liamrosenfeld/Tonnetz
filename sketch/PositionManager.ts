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

  // interactions
  moveLeft() {
    this.x -= 1;
    if (this.x < 0) {
      this.x = this.w - 1;
    }
    this.update();
  }

  moveRight() {
    this.x += 1;
    if (this.x >= this.w) {
      this.x = 0;
    }
    this.update();
  }

  moveVertically() {
    if (this.x % 2 == 0) {
      if (this.y - 1 >= 0) {
        this.y -= 1;
        this.x += 1;
      }
    } else if (this.y + 1 < this.h) {
      this.y +=1;
      this.x -= 1;
    }
    this.update();
  } 

  update() {
    this.lattice.selectedX = this.x;
    this.lattice.selectedY = this.y;
    this.player.setTriPosition(this.x, this.y);
  }


}