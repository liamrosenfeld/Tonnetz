class Recorder {

  private sketch: p5;
  private manager: PositionManager;

  private recording: Recording;
  private prevTime: Float;
  private isRecording: boolean;

  constructor(sketch: p5, manager: PositionManager) {
    this.sketch = sketch;
    this.manager = manager;
    this.recording = new Recording(this.manager);
  }

  newRecording() {
    // new recording
    this.isRecording = true;
    this.recording = new Recording(this.manager);
    this.prevTime = this.sketch.millis();

    // starting position
    const startLoc: Teleport = { x: this.manager.getX, y: this.manager.getY }; 
    this.recording.add(startLoc);
  }

  addMove(move: Action) {
    if (!this.isRecording) { return };

    // find wait (since last action)
    const waitTime = this.sketch.millis() - this.prevTime;
    this.prevTime = this.sketch.millis();
    const wait: Wait = { time: waitTime };
    
    // add wait and move
    this.recording.add(wait);
    this.recording.add(move);
  }

  stopRecording(): Recording {
    this.isRecording = false;
    return this.recording;
  }
}
