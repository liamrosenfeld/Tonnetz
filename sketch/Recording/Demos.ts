class Demos {

  static brahms102(): Action[] {
    const start: Teleport = {x: 7, y: 1};
    const wait: Wait = {time: 1250};

    const actions: Action[] = [
      start,
      wait,
      Move.Parallel,
      wait,
      Move.Left,
      wait,
      Move.Parallel,
      wait,
      Move.Left,
      wait,
      Move.Parallel,
      wait,
      Move.Left
    ]

    return actions;
  }

  static hamiltonian(w: Int, h: Int): Action[] {
    const start: Teleport = {x: 0, y: h - 1};
    const wait: Wait = { time: 150 };

    let actions: Action[] = [start, wait];

    const limit = Math.floor((w - 1) / 2);
    for(let col = 0; col <= limit; col++) {
      for(let row = 0; row < h - 1; row++) {
        // major
        actions.push(Move.Parallel);
        actions.push(wait);
  
        // minor (left)
        actions.push(Move.Left);
        actions.push(wait);
      }
      actions.push(Move.Parallel);
      actions.push(wait);

      if (col != limit) {
        actions.push(Move.Right);
        actions.push(wait);
      } else {
        console.log("here");
      }
    }

    return actions;
  }

}
