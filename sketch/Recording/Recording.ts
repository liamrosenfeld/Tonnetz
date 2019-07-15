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
      this.manager.teleport(tele.x, tele.y);
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
      case Move.LeadingTone : { this.manager.leadingTone(); break }
      case Move.Parallel    : { this.manager.parallel(); break }
      case Move.Relative    : { this.manager.relative(); break }
      case Move.NebenLeft   : { this.manager.nebenLeft(); break }
      case Move.NebenRight  : { this.manager.nebenRight(); break }
      case Move.Slide       : { this.manager.slide(); break }
      case Move.HexatonicPole  : { this.manager.hexatonicPole(); break }
    }
  }
}
