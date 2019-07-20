class RecordingPicker {

  // managers
  private sketch: p5;
  private sizeManager: SizeManager;

  // managed
  private recorder: Recorder;
  private recording: Recording;

  // buttons
  private startButton: p5.Element;
  private stopButton:  p5.Element;
  private playButton:  p5.Element;

  x: Float;
  y: Float;

  constructor(sketch: p5, manager: PositionManager, sizeManager: SizeManager) {
    this.sketch = sketch;
    this.recorder = manager.recorder;

    this.sizeManager = sizeManager;

    this.reposition();
  }

  reposition() {
    this.x = this.sizeManager.recordingX;
    this.y = this.sizeManager.recordingY;
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let y = this.y;
    this.sketch.text("Recording", this.x, y);
    y += 10
    this.startButton = createButton(this.sketch, "Start New", this.x, y, this.start);
    y += 40
    this.stopButton  = createButton(this.sketch, "Stop Recording", this.x, y, this.stop);
    y += 40
    this.playButton  = createButton(this.sketch, "Play Back", this.x, y, this.play);

    this.stopButton.attribute('disabled', '');
    this.playButton.attribute('disabled', '');
  }

  removeButtons() {
    this.startButton.remove();
    this.stopButton.remove();
    this.playButton.remove();
  }


  // functionality
  private start = () => {
    this.recorder.newRecording();

    this.startButton.attribute('disabled', '');
    this.stopButton.removeAttribute('disabled');

    return true;
  }

  private stop = () => {
    this.recording = this.recorder.stopRecording();

    this.stopButton.attribute('disabled', '');
    this.startButton.removeAttribute('disabled');
    this.playButton.removeAttribute('disabled');

    return true;
  }

  private play = () => {
    this.recording.playBack();
    return true;
  }

}
