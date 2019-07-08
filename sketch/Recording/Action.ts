const enum Move {
  LeadingTone = "LeadingTone",
  Parallel = "Parallel",
  Relative = "Relative",
  NebenLeft = "NebenLeft",
  NebenRight = "NebenRight",
  Slide = "Slide",
  HexatonicPole = "HexatonicPole"
}

interface Wait {
  time: Float;
}

interface Teleport {
  x: Int;
  y: Int;
}

type Action = Move | Wait | Teleport;