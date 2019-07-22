class RecordingPicker {

  // managers
  private sketch: p5;
  private manager: PositionManager;
  private sizeManager: SizeManager;

  // managed
  private recorder: Recorder;
  private recordingPlayer: RecordingPlayer;
  private recording: Action[];

  // buttons
  private readonly buttonSpacing = 30;

  private startRecButton: p5.Element;
  private stopRecButton:  p5.Element;
  private startPlayButton:  p5.Element;
  private stopPlayButton:  p5.Element;

  private brahmsButton: p5.Element;
  private hamiltonianButton: p5.Element;

  // labels
  readonly fontSize = 20
  private userLabel:  p5.Element;
  private demoLabel: p5.Element;

  constructor(sketch: p5, manager: PositionManager, sizeManager: SizeManager) {
    this.sketch = sketch;
    this.manager = manager;
    this.recordingPlayer = new RecordingPlayer(manager, this);
    this.recorder = manager.recorder;
    this.sizeManager = sizeManager;
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let x = this.sizeManager.recordingX;
    let y = this.sizeManager.recordingY;

    this.userLabel = createLabel(this.sketch, "Recording", x, y, this.fontSize);
    y += 10
    this.startRecButton = createButton(this.sketch, "Start New", x, y, this.startRec);
    y += this.buttonSpacing
    this.stopRecButton  = createButton(this.sketch, "Stop Recording", x, y, this.stopRec);
    y += this.buttonSpacing
    this.startPlayButton = createButton(this.sketch, "Start Play Back", x, y, this.startPlay);
    y += this.buttonSpacing
    this.stopPlayButton  = createButton(this.sketch, "Stop Play Back", x, y, this.stopPlay);

    x = this.sizeManager.demoX;
    y = this.sizeManager.demoY;
    this.demoLabel = createLabel(this.sketch, "Examples", x, y, this.fontSize);
    y += 10
    this.brahmsButton = createButton(this.sketch, "Brahms Opus 102", x, y, this.brahms);
    y += this.buttonSpacing
    this.hamiltonianButton = createButton(this.sketch, "Hamiltonian Path", x, y, this.hamiltonian);

    this.stopRecButton.attribute("disabled", "");
    this.startPlayButton.attribute("disabled", "");
    this.stopPlayButton.attribute("disabled", "");
  }

  reposition() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let x = this.sizeManager.recordingX;
    let y = this.sizeManager.recordingY;

    this.userLabel.position(x, y - this.fontSize);
    y += 10
    this.startRecButton.position(x, y);
    y += this.buttonSpacing
    this.stopRecButton.position(x, y);
    y += this.buttonSpacing
    this.startPlayButton.position(x, y);
    y += this.buttonSpacing
    this.stopPlayButton.position(x, y);

    x = this.sizeManager.demoX;
    y = this.sizeManager.demoY;
    this.demoLabel.position(x, y - this.fontSize);
    y += 10
    this.brahmsButton.position(x, y);
    y += this.buttonSpacing
    this.hamiltonianButton.position(x, y);
  }

  // user
  private startRec = () => {
    // reset voice leading
    this.manager.pitches.resetTo(this.manager.getX, this.manager.getY);
    if (this.manager.player.getPlaying) {
      this.manager.player.start();
    }

    // start recording
    this.recorder.newRecording();

    // update buttons
    this.startRecButton.attribute("disabled", "");
    this.stopRecButton.removeAttribute("disabled");

    return true;
  }

  private stopRec = () => {
    this.recording = this.recorder.stopRecording();

    this.stopRecButton.attribute("disabled", "");
    this.startRecButton.removeAttribute("disabled");
    this.startPlayButton.removeAttribute("disabled");

    return true;
  }

  private startPlay = () => {
    this.recordingPlayer.playBack(this.recording);

    this.playButtonsDisable();

    return true;
  }

  private stopPlay = () => {
    this.recordingPlayer.stop();

    this.playButtonEnable();

    return true;
  }
  
  // demo
  private brahms = () => {
    this.recordingPlayer.playBack(Demos.brahms102());
    this.playButtonsDisable();
    return true;
  }

  private hamiltonian = () => {
    this.recordingPlayer.playBack(Demos.hamiltonian(this.sizeManager.w, this.sizeManager.h));
    this.playButtonsDisable();
    return true;
  }

  // button toggling
  private playButtonsDisable() {
    this.stopPlayButton.removeAttribute("disabled");
    this.startPlayButton.attribute("disabled", "");
    this.brahmsButton.attribute("disabled", "");
    this.hamiltonianButton.attribute("disabled", "");
  }

  playButtonEnable() {
    this.stopPlayButton.attribute("disabled", "");
    this.startPlayButton.removeAttribute("disabled");
    this.brahmsButton.removeAttribute("disabled");
    this.hamiltonianButton.removeAttribute("disabled");
  }

  // system
  resetRecording() {
    this.stopPlay();
    this.recording = [];
    this.playButtonEnable();
    this.startPlayButton.attribute("disabled", "");
  }

}
