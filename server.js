var express = require('express');
var app = express();

var fs = require("fs");


app.use(express.static(__dirname));

// app.get('/', function(req, res){
//   res.set('content-type', 'text/html');
//   res.send(fs.readFileSync(__dirname + '/index.html', 'utf8'));
// });

app.get('*', function(req, res){
  res.set('content-type', 'text/html');
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf8'));
});

app.listen(80);
