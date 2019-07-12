const express = require('express');
const path = require('path');
const app = express();
const port = 8080

app.use('/build', express.static('build'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'sketch.html'));
});

app.get('*', function(req, res){
  res.status(404).send('what???');
});
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
