class Player {
  // Init
  private sampler: Tone.Sampler;
  private pitches: Pitches;

  constructor(pitches: Pitches) {
    this.pitches = pitches;
    this.sampler = new Tone.Sampler(sampleFiles, null , "/samples/")
    this.configSampler();
  }

  private configSampler() {
    this.sampler.release = 1;
    // sampler.cur
    this.sampler.toMaster();
  }

  // toggling playback
  private playing = false;
  get getPlaying() { return this.playing }

  start() {
    this.playing = true;
    this.playAll();
  }

  stop() {
    this.sampler.releaseAll();
    this.playing = false;
  }

  setPitches() {
    console.log(this.pitches.toString());
    this.playAll();
  }

  private playAll() {
    if (this.playing) {
      this.sampler.releaseAll();
      this.sampler.triggerAttack(Midi.fullName(this.pitches.getRoot));
      this.sampler.triggerAttack(Midi.fullName(this.pitches.getThird));
      this.sampler.triggerAttack(Midi.fullName(this.pitches.getFifth));
    }
  }
}
