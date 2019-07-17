// imports
const express = require("express");
const path = require("path");

// constants
const app = express();
const port = 8080
const htmlDir = path.join(__dirname, "pages")

// static resources
app.use("/build", express.static("build"))

// routes
app.get("/", function(req, res) {
  res.sendFile(path.join(htmlDir, "index.html"));
});

app.get("/vis", function(req, res) {
  res.sendFile(path.join(htmlDir, "sketch.html"));
});

app.get("/explain", function(req, res) {
  res.sendFile(path.join(htmlDir, "explain.html"));
});

app.get("/about", function(req, res) {
  res.sendFile(path.join(htmlDir, "about.html"));
});

app.get("*", function(req, res) {
  res.status(404).sendFile(path.join(htmlDir, "404.html"))
});
  
// listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
