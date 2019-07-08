let start: Teleport = {x: 7, y: 1};
let wait: Wait = {time: 1250};

const brahms102: Action[] = [
  start,
  wait,
  Move.Parallel,
  wait,
  Move.LeadingTone,
  wait,
  Move.Parallel,
  wait,
  Move.LeadingTone,
  wait,
  Move.Parallel,
  wait,
  Move.LeadingTone
]