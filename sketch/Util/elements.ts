
function createButton(sketch: p5, text: string, x: Float, y: Float, callback: () => boolean): p5.Element {
  let button = sketch.createButton(text);
  button.parent("sketch-holder");
  button.position(x, y);
  button.style("font-size", "12px");
  button.style("padding", "5px");
  button.style("width", "175px");
  button.style("text-align", "left");
  button.mousePressed(callback);
  return button;
}

function createLabel(sketch: p5, text: string, x: Float, y: Float, fontSize: Float): p5.Element {
  let label = sketch.createElement("p", text);
  label.position(x, y + fontSize);
  label.style("font-size", fontSize + "px");
  label.style("color", "#ffffff")
  return label;
}
