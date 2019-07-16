class Midi {

  static calcMidi(w: Int, h: Int): Int[][] {
    const fifth = 7
    const majThird = 4

    let midi: number[][] = new Array();
    let rowStart = 47; // B2

    for (let row = 0; row <= h; row += 1) {
      // fist note in row
      midi.push([]); 
      midi[row].push(rowStart);

      // rest of row
      for (let col = 1; col <= Math.floor(w / 2); col += 1) {
        const nextNote = rowStart + ((col * fifth) % 12)
        midi[row].push(nextNote);
      }

      // next row value
      rowStart += majThird;
    }
    return midi;
  }

  static nameFromMidi(value: Int): string {
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const noteValue = value % 12;
    const noteName  = noteNames[noteValue];
    return noteName;
  }

}
