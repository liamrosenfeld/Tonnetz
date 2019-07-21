class RecordingPlayer {

  private manager: PositionManager;
  private picker: RecordingPicker;

  private actions: Action[] = new Array();

  private stopped = false;

  constructor(manager: PositionManager, picker: RecordingPicker) {
    this.manager = manager;
    this.picker = picker;
  }

  // Playing Back
  playBack(recording: Action[]) {
    this.actions = [...recording]; // duplicate
    this.play();
  }

  stop() {
    this.stopped = true;
  }

  private play() {
    const action = this.actions.shift();

    if ((action as Wait).time !== undefined) {

      const wait = action as Wait
      console.log("wait: " + wait.time);
      setTimeout(this.next, wait.time);

    } else if ((action as Teleport).x !== undefined) {

      const tele = action as Teleport
      console.log("teleport: " + tele.x + ", " + tele.y);
      this.manager.teleport(tele.x, tele.y);
      this.next();

    } else if ((action as Move).toUpperCase !== undefined) {

      const move = action as Move
      this.matchMove(move);
      this.next();

    } else {
      console.error("Invalid Recorded Action: " + action);
    }
  }

  private next = () => {
    if (this.stopped) {
      console.log("Stopped.");
      this.stopped = false;
    } else if (this.actions.length > 0) {
      this.play();
    } else {
      this.picker.playButtonEnable();
      console.log("Done.");
    }
  }

  private matchMove(move: Move) {
    switch(move) {
      case Move.Left           : { this.manager.left(); break }
      case Move.Parallel       : { this.manager.parallel(); break }
      case Move.Right          : { this.manager.right(); break }
      case Move.NebenLeft      : { this.manager.nebenLeft(); break }
      case Move.NebenRight     : { this.manager.nebenRight(); break }
      case Move.Slide          : { this.manager.slide(); break }
      case Move.HexatonicPole  : { this.manager.hexatonicPole(); break }
    }
  }
}
