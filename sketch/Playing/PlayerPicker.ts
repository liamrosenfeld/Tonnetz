class PlayerPicker {

  private sketch: p5;
  private manager: PositionManager;
  private player: Player;
  private pitches: Pitches;

  x: Float
  y: Float

  private muteButton: p5.Element;
  private recenterButton: p5.Element;

  constructor(sketch: p5, manager: PositionManager, x: Float, y: Float) {
    this.sketch = sketch;
    this.manager = manager;
    this.player = manager.player;
    this.pitches = manager.pitches;
    this.x = x;
    this.y = y;
  }

  drawButtons() {
    this.sketch.fill(1000);
    this.sketch.textSize(20);

    let y = this.y
    this.sketch.text("Playback", this.x, y);
    y += 10
    this.muteButton = this.createButton(this.player.getPlaying ? "Mute" : "Unmute", y, this.toggleMute);
    y += 40
    this.recenterButton = this.createButton("Recenter Progression", y, this.recenter);
  }

  removeButtons() {
    this.muteButton.remove()
    this.recenterButton.remove()
  }

  createButton(text: string, y: Float, callback: () => boolean): p5.Element {
    let button = this.sketch.createButton(text);
    button.position(this.x, y);
    button.style('font-size', '12px');
    button.style('padding', '5px');
    button.style('width', '190px');
    button.style('text-align', 'left');
    button.mousePressed(callback);
    return button;
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
    this.player.setPitches(this.pitches);
    return true;
  }
}
