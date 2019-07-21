// imports
const express = require("express");
const path = require("path");
const marked = require('marked');
const fs = require('fs');

// constants
const port = 8080;
const pagesDir = path.join(__dirname, "pages");
const mdDir = path.join(__dirname, "text");

// configure app
const app = express();
app.set('view engine', 'ejs');

// static resources
app.use("/build", express.static("build"));
app.use("/samples", express.static("samples"));

// markdown
const explainDir = path.join(mdDir, "explain.md");
const aboutDir = path.join(mdDir, "about.md");
const explainText = fs.readFileSync(explainDir, {"encoding" : "utf8"});
const aboutText = fs.readFileSync(aboutDir, {"encoding" : "utf8"});
const explain = {"content" : marked(explainText)}
const about = {"content" : marked(aboutText)}

// routes
app.get("/", function(req, res) {
  res.render(path.join(pagesDir, "sketch"));
});

app.get("/explain", function(req, res) {
  res.render(path.join(pagesDir, "text"), explain);
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
