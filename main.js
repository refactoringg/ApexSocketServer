const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
});


io.on('connection', (socket) => {
    socket.on('ready_u', (f) => {
        console.log("User connected: " + JSON.parse(f).msg)
        io.emit('connection_u', JSON.parse(f).msg);
    })

    socket.on('chat message', (user, msg) => {
      io.emit('chat message', user, msg);
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});