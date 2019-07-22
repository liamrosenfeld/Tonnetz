class SizeManager {
  // constants
  private readonly defaultTriSize = 100;
  private readonly minTriLong = 12;
  private readonly buttonSectionWidth = 245;

  // private
  private winWidth: Float;

  // Window Stuff
  winHeight: Float;

  // Lattice Stuff
  w: Int = 12;
  h: Int = 3;
  triSize: Float = 100;

  centerX: Int = 2 * Math.floor(this.w / 4);
  centerY: Int = Math.floor(this.h / 2);

  // Button Stuff
  playbackX: Float;
  playbackY: Float;

  primaryX: Float;
  primaryY: Float;

  compoundX: Float;
  compoundY: Float;

  recordingX: Float;
  recordingY: Float;

  demoX: Float;
  demoY: Float;

  // change
  private oldW: Int = 12;
  private oldH: Int = 3;
  private oldX: Int = 2 * Math.floor(this.w / 4);
  private oldY: Int = Math.floor(this.h / 2);
  private oldTri: Float = 100;
  diffSize: boolean;
  newMiddle: boolean;

  calcSizes(width: Float) {
    this.winWidth = width - 50; // factor in padding

    this.calcLattice();

    this.calcButtons();
  }

  private calcLattice() {
    const minDefault = this.defaultTriSize * this.minTriLong / 1.5;

    if (minDefault > this.winWidth) {
      // shrink triangles (too skinny width)
      this.triSize = this.winWidth * 1.5 / this.minTriLong;
      this.w = this.minTriLong;
    } else {
      // increase width (room available)
      this.triSize = this.defaultTriSize;
      this.w = 2 * Math.floor((this.winWidth * 1.75) / this.defaultTriSize / 2);
    }

    // New Centers
    this.centerX = 2 * Math.floor(this.w / 4);
    this.centerY = Math.floor(this.h / 2);

    // Check if Different
    if (this.centerX != this.oldX || this.centerY != this.oldY) {
      this.diffSize = true;
      this.newMiddle = true;
      this.updateOld();
    } else if (this.w != this.oldW || this.h != this.oldH || this.triSize != this.oldTri) {
      this.diffSize = true;
      this.newMiddle = false;
      this.updateOld();
    } else {
      this.diffSize = false;
      this.newMiddle = false;
    }
  }

  private updateOld() {
    this.oldW = this.w;
    this.oldH = this.h;
    this.oldTri = this.triSize;
    this.oldX = this.centerX;
    this.oldY = this.centerY;
  }

  private calcButtons() {
    const perButton = 40;
    const padding = 30;

    let buttonSectionTop = this.triSize * 3.5;

    if (this.winWidth > this.buttonSectionWidth * 5 + 100) {
      // all next to each other
      this.playbackY = buttonSectionTop;
      this.primaryY = buttonSectionTop;
      this.compoundY = buttonSectionTop;
      this.recordingY = buttonSectionTop;
      this.demoY = buttonSectionTop;

      let x = (this.winWidth - (this.buttonSectionWidth * 5 + 50)) / 2;
      this.playbackX = x;
      x += this.buttonSectionWidth;
      this.primaryX = x;
      x += this.buttonSectionWidth + 25;
      this.compoundX = x;
      x += this.buttonSectionWidth + 25;
      this.recordingX = x;
      x += this.buttonSectionWidth;
      this.demoX = x;

      this.winHeight = buttonSectionTop + (4 * perButton) + padding;

    } else if (this.winWidth > this.buttonSectionWidth * 3 + 50) {
      // all next to each other
      this.playbackY = buttonSectionTop;
      this.primaryY = buttonSectionTop;
      this.compoundY = buttonSectionTop + (3 * perButton) + padding;
      this.recordingY = buttonSectionTop;
      this.demoY = buttonSectionTop + (4 * perButton) + padding;;

      let x = (this.winWidth - (this.buttonSectionWidth * 3 + 25)) / 2;
      this.playbackX = x;
      x += this.buttonSectionWidth;
      this.primaryX = x;
      this.compoundX = x;
      x += this.buttonSectionWidth + 25;
      this.recordingX = x;
      this.demoX = x;

      this.winHeight = this.demoY + (2 * perButton) + padding;

    } else {
      // all stacked
      let y = buttonSectionTop + padding;
      this.playbackY = y;
      y += 2 * perButton + padding;
      this.primaryY = y;
      y += 3 * perButton + padding;
      this.compoundY = y;
      y += 4 * perButton + padding;
      this.recordingY = y;
      y += 4 * perButton + padding;
      this.demoY = y;

      let x = (this.winWidth - this.buttonSectionWidth) / 2;
      this.playbackX = x;
      this.primaryX = x;
      this.compoundX = x;
      this.recordingX = x;
      this.demoX = x;

      this.winHeight = y + (2 * perButton) + padding;
    }
  }

}
