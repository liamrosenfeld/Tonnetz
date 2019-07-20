class PlayerPicker {

  // managers
  private sketch: p5;
  private manager: PositionManager;
  private sizeManager: SizeManager;

  // managed
  private player: Player;
  private pitches: Pitches;

  private muteButton: p5.Element;
  private recenterButton: p5.Element;

  constructor(sketch: p5, manager: PositionManager, sizeManager: SizeManager) {
    this.sketch = sketch;
    this.manager = manager;
    this.player = manager.player;
    this.pitches = manager.pitches;
    this.sizeManager = sizeManager;
  }

  reposition() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let x = this.sizeManager.playbackX;
    let y = this.sizeManager.playbackY;

    this.sketch.text("Playback", x, y);
    y += 10
    this.muteButton.position(x, y);
    y += 40
    this.recenterButton.position(x, y);
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let x = this.sizeManager.playbackX;
    let y = this.sizeManager.playbackY;
    
    this.sketch.text("Playback", x, y);
    y += 10
    this.muteButton = createButton(this.sketch, this.player.getPlaying ? "Mute" : "Unmute", x, y, this.toggleMute);
    y += 40
    this.recenterButton = createButton(this.sketch, "Recenter Progression", x, y, this.recenter);
  }

  private toggleMute = () => {
    if (this.player.getPlaying) {
      this.player.stop();
      this.muteButton.html("Unmute");
    } else {
      this.player.start();
      this.muteButton.html("Mute");
    }

    return true;
  }

  private recenter = () => {
    this.pitches.resetTo(this.manager.getX, this.manager.getY)
    this.player.setPitches();
    return true;
  }
}
