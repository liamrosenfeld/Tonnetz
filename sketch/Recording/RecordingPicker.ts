class RecordingPicker {

  private sketch: p5;

  private recorder: Recorder;
  private recording: Recording;

  private startButton: p5.Element;
  private stopButton:  p5.Element;
  private playButton:  p5.Element;

  constructor(sketch: p5, manager: PositionManager) {
    this.sketch = sketch;
    this.recorder = manager.recorder;
  }

  drawButtons() {
    this.sketch.text("Recording", 500, 500);
    this.startButton = this.createButton("Start New", 510, this.start);
    this.stopButton  = this.createButton("Stop Recording", 550, this.stop);
    this.playButton  = this.createButton("Play Back", 590, this.play);

    this.stopButton.attribute('disabled', '');
    this.playButton.attribute('disabled', '');
  }

  createButton(text: string, y: number, callback: () => boolean): p5.Element {
    let button = this.sketch.createButton(text);
    button.position(500, y);
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
