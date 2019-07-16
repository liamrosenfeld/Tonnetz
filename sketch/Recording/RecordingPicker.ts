class RecordingPicker {

  private sketch: p5;

  private recorder: Recorder;
  private recording: Recording;

  private startButton: p5.Element;
  private stopButton:  p5.Element;
  private playButton:  p5.Element;

  x: Float;
  y: Float;

  constructor(sketch: p5, manager: PositionManager, x: Float, y: Float) {
    this.sketch = sketch;
    this.recorder = manager.recorder;

    this.x = x;
    this.y = y;
  }

  drawButtons() {
    let y = this.y;
    this.sketch.text("Recording", this.x, y);
    y += 10
    this.startButton = this.createButton("Start New", y, this.start);
    y += 40
    this.stopButton  = this.createButton("Stop Recording", y, this.stop);
    y += 40
    this.playButton  = this.createButton("Play Back", y, this.play);

    this.stopButton.attribute('disabled', '');
    this.playButton.attribute('disabled', '');
  }

  removeButtons() {
    this.startButton.remove();
    this.stopButton.remove();
    this.playButton.remove();
  }

  createButton(text: string, y: number, callback: () => boolean): p5.Element {
    let button = this.sketch.createButton(text);
    button.position(this.x, y);
    button.style('font-size', '12px');
    button.style('padding', '5px');
    button.style('width', '190px');
    button.style('text-align', 'left');
    button.mousePressed(callback);
    return button;
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
