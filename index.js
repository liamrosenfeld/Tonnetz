// imports
const express = require("express");
const path = require("path");
const marked = require('marked');
const fs = require('fs');

// constants
const port = 8080;

// directories
const pagesDir = path.join(__dirname, "pages");
const mdDir = path.join(__dirname, "text");

// configure app
const app = express();
app.set('view engine', 'ejs');

// static resources
app.use("/build", express.static("build"));
app.use("/samples", express.static("samples"));
app.use("/images", express.static("images"));

// markdown
function mdToHtml(fileName) {
  const dir = path.join(mdDir, fileName + ".md");
  const text = fs.readFileSync(dir, {"encoding" : "utf8"});
  const html = {"content" : marked(text)}
  return html;
}

const music = mdToHtml("explain-music")
const code  = mdToHtml("explain-code")
const instructions = mdToHtml("instructions")
const about = mdToHtml("about")

// routes
app.get("/", function(req, res) {
  res.render(path.join(pagesDir, "sketch"));
});

app.get("/explain-music", function(req, res) {
  res.render(path.join(pagesDir, "text"), music);
});

app.get("/explain-code", function(req, res) {
  res.render(path.join(pagesDir, "text"), code);
});

app.get("/instructions", function(req, res) {
  res.render(path.join(pagesDir, "text"), instructions);
});

app.get("/about", function(req, res) {
  res.render(path.join(pagesDir, "text"), about);
});

app.get("*", function(req, res) {
  res.status(404).render(path.join(pagesDir, "404"))
});
  
// listen
app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
