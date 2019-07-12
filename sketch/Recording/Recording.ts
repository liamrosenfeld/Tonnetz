class Recording {

  private manager: PositionManager;

  private actions: Action[] = new Array();
  private tempActions: Action[] = new Array();

  constructor(manager: PositionManager) {
    this.manager = manager;
  }

  add(action: Action) {
    this.actions.push(action);
  }

  // Playing Back
  playDemo(demo: Action[]) {
    this.tempActions = [...demo]; // duplicate
    this.play();
  }

  playBack() {
    this.tempActions = [...this.actions]; // duplicate
    this.play();
  }

  private play() {
    const action = this.tempActions.shift();
    
    if ((action as Wait).time) {

      const wait = action as Wait
      console.log("wait: " + wait.time);
      setTimeout(this.next, wait.time);

    } else if ((action as Teleport).x) {

      const tele = action as Teleport
      console.log("teleport: " + tele.x + ", " + tele.y);
      this.teleport(tele);
      this.next();

    } else if (action as Move) {

      const move = action as Move
      console.log("move: " + move);
      this.matchMove(move);
      this.next();

    } else {
      console.error("Invalid Recorded Action: " + action);
    }
  }

  private next = () => {
    if (this.tempActions.length > 0) {
      this.play();
    } else {
      console.log("Done.");
    }
  }

  private matchMove(move: Move) {
    switch(move) {
      case Move.LeadingTone : { this.leadingTone(); break }
      case Move.Parallel    : { this.parallel(); break }
      case Move.Relative    : { this.relative(); break }
      case Move.NebenLeft   : { this.nebenLeft(); break }
      case Move.NebenRight  : { this.nebenRight(); break }
      case Move.Slide       : { this.slide(); break }
      case Move.HexatonicPole  : { this.hexatonicPole(); break }
    }
  }

  // TODO: should abstract
  teleport(tele: Teleport) {
    this.manager.teleport(tele.x, tele.y);
    this.manager.update();
  }

  leadingTone() {
    this.manager.leadingTone();
    this.manager.update();
  }

  parallel() {
    this.manager.parallel();
    this.manager.update();
  }

  relative() {
    this.manager.relative();
    this.manager.update();
  }

  nebenLeft() {
    this.manager.nebenLeft();
    this.manager.update();
  }

  nebenRight() {
    this.manager.nebenRight();
    this.manager.update();
  }

  slide() {
    this.manager.slide();
    this.manager.update();
  }

  hexatonicPole() {
    this.manager.hexatonicPole();
    this.manager.update();
  }
}
