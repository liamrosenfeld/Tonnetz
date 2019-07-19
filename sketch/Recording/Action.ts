const enum Move {
  Left = "Left",
  Parallel = "Parallel",
  Right = "Right",
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
