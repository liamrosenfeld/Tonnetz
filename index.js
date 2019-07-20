// imports
const express = require("express");
const path = require("path");

// constants
const port = 8080;
const pagesDir = path.join(__dirname, "pages");

// configure app
const app = express();
app.set('view engine', 'ejs');

// static resources
app.use("/build", express.static("build"));
app.use("/samples", express.static("samples"));

// routes
app.get("/", function(req, res) {
  res.render(path.join(pagesDir, "sketch"));
});

app.get("/explain", function(req, res) {
  res.render(path.join(pagesDir, "explain"));
});

app.get("/about", function(req, res) {
  res.render(path.join(pagesDir, "about"));
});

app.get("*", function(req, res) {
  res.status(404).render(path.join(pagesDir, "404"))
});
  
// listen
app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
