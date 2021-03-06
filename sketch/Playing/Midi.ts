class Midi {

  static calcMidi(w: Int, h: Int): Int[][] {
    const fifth = 7
    const majThird = 4

    let midi: number[][] = new Array();

    const topLeft = 47 ; // B2

    for (let row = 0; row <= h; row += 1) {
      // fist note in row
      const rowStart = topLeft + ((row * majThird) % 12); // B2
      midi.push([]); 
      midi[row].push(rowStart);

      // rest of row
      for (let col = 1; col <= Math.floor(w / 2); col += 1) {
        const nextNote = rowStart + ((col * fifth) % 12)
        midi[row].push(nextNote);
      }
    }

    return midi;
  }

  static cleanName(value: Int): string {
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const noteValue = value % 12;
    const noteName  = noteNames[noteValue];
    return noteName;
  }

  static fullName(value: Int): string {
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const noteValue = value % 12;
    const octave    = Math.floor(value / 12) - 1;
    const noteName  = noteNames[noteValue] + octave;
    return noteName;
  }

}
