class PlayerPicker {

  // managers
  private sketch: p5;
  private manager: PositionManager;
  private sizeManager: SizeManager;

  // managed
  private player: Player;
  private pitches: Pitches;

  // position
  x: Float
  y: Float

  private muteButton: p5.Element;
  private recenterButton: p5.Element;

  constructor(sketch: p5, manager: PositionManager, sizeManager: SizeManager) {
    this.sketch = sketch;
    this.manager = manager;
    this.player = manager.player;
    this.pitches = manager.pitches;
    this.sizeManager = sizeManager;

    this.reposition();
  }

  reposition() {
    this.x = this.sizeManager.playbackX;
    this.y = this.sizeManager.playbackY;
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let y = this.y
    this.sketch.text("Playback", this.x, y);
    y += 10
    this.muteButton = createButton(this.sketch, this.player.getPlaying ? "Mute" : "Unmute", this.x, y, this.toggleMute);
    y += 40
    this.recenterButton = createButton(this.sketch, "Recenter Progression", this.x, y, this.recenter);
  }

  removeButtons() {
    this.muteButton.remove()
    this.recenterButton.remove()
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
