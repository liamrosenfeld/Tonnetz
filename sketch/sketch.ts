var lattice = new Lattice(12, 5);

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(51);
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(51);
  redraw();
}

function draw() {
  lattice.draw();
}

function keyPressed() {
  if (key == 's') {
    lattice.moveVertically();
  } else if (key == 'a') {
    lattice.moveLeft();
  } else if (key == 'd') {
    lattice.moveRight();
  }
  redraw();
}
