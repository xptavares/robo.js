var express = require('express');
var http = require('http');
var app = express();
var socket = require('socket.io');

app.use(express.static(__dirname + "/public"));

var server = http.createServer(app).listen(3000, function(){
  console.log("Robo server listening on port " + 3000);
});

var io = socket.listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('direction', function (data) {
    console.log(data);
  });
});