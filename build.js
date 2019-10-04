// imports
const path = require("path");
const marked = require('marked');
const fs = require('fs');
const ejs = require("ejs");

// directories
const publicDir = path.join(__dirname, "public");
const pagesDir = path.join(__dirname, "pages");
const mdDir = path.join(__dirname, "text");

// markdown
function mdToHtml(fileName) {
  const dir = path.join(mdDir, fileName + ".md");
  const text = fs.readFileSync(dir, {"encoding" : "utf8"});
  const html = {"content" : marked(text)}
  return html;
}

const music = mdToHtml("explain-music")
const code  = mdToHtml("explain-code")
const inst  = mdToHtml("instructions")
const about = mdToHtml("about")

// render
ejs.renderFile(path.join(pagesDir, "sketch.ejs")).then(value => {
  fs.writeFileSync(path.join(publicDir, "index.html"), value)
}, reason => {
  console.error("RENDER ERROR:" + reason)
})

ejs.renderFile(path.join(pagesDir, "text.ejs"), music).then(value => {
  fs.writeFileSync(path.join(publicDir, "explain-music.html"), value)
}, reason => {
  console.error("RENDER ERROR:" + reason)
});

ejs.renderFile(path.join(pagesDir, "text.ejs"), code).then(value => {
  fs.writeFileSync(path.join(publicDir, "explain-code.html"), value)
}, reason => {
  console.error("RENDER ERROR:" + reason)
});

ejs.renderFile(path.join(pagesDir, "text.ejs"), inst).then(value => {
  fs.writeFileSync(path.join(publicDir, "instructions.html"), value)
}, reason => {
  console.error("RENDER ERROR:" + reason)
});

ejs.renderFile(path.join(pagesDir, "text.ejs"), about).then(value => {
  fs.writeFileSync(path.join(publicDir, "about.html"), value)
}, reason => {
  console.error("RENDER ERROR:" + reason)
});

ejs.renderFile(path.join(pagesDir, "404.ejs"), about).then(value => {
  fs.writeFileSync(path.join(publicDir, "404.html"), value)
}, reason => {
  console.error("RENDER ERROR:" + reason)
});
