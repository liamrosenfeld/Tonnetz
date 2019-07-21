class Recorder {

  private sketch: p5;
  private manager: PositionManager;

  private recording: Action[] = new Array();
  private prevTime: Float;
  private isRecording: boolean;

  constructor(sketch: p5, manager: PositionManager) {
    this.sketch = sketch;
    this.manager = manager;
  }

  newRecording() {
    // new recording
    this.recording = [];
    this.isRecording = true;
    this.prevTime = this.sketch.millis();

    // starting position
    const startLoc: Teleport = { x: this.manager.getX, y: this.manager.getY }; 
    this.recording.push(startLoc);
  }

  addMove(move: Action) {
    if (!this.isRecording) { return };

    // find wait (since last action)
    const waitTime = this.sketch.millis() - this.prevTime;
    this.prevTime = this.sketch.millis();
    const wait: Wait = { time: waitTime };
    
    // add wait and move
    this.recording.push(wait);
    this.recording.push(move);
  }

  stopRecording(): Action[] {
    this.isRecording = false;
    return this.recording;
  }
}
