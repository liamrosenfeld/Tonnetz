class Midi {

  static calcMidi(w: Int, h: Int): Int[][] {
    let midi: number[][] = new Array();

    let rowStart = 47; // B2

    for (let row = 0; row < h + 1; row += 1) {
      // fist note in row
      midi.push([]);
      midi[row].push(rowStart);

      // rest of row
      for (let col = 1; col < w; col += 1) {
        const nextNote = rowStart + (col * 7) // perfect 5th
        midi[row].push(nextNote);
      }

      // next row value
      rowStart += 4; // major 3rd
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
