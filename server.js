const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const TOPIC_NAME = 'imu-data';
const subscribers = new Set();

app.use(express.static(__dirname + ''));

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.on('publish', (data) => {
    console.log(`received data from ${socket.id}: ${data}`);
    const jsonData = JSON.parse(data);
    io.emit(TOPIC_NAME, jsonData);
  });
  socket.on('subscribe', () => {
    console.log(`subscribed user: ${socket.id}`);
    subscribers.add(socket);
  });
  socket.on('unsubscribe', () => {
    console.log(`unsubscribed user: ${socket.id}`);
    subscribers.delete(socket);
  });
});

http.listen(5500, () => {
  console.log('listening on *:5500');
});
