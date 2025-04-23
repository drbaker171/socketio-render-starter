// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Allow CORS from anywhere so your HTML on Hostinger can connect
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('roll', rollValue => {
    console.log(`User ${socket.id} rolled ${rollValue}`);
    io.emit('roll', { id: socket.id, value: rollValue });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Socket.IO server running on port ${PORT}`));
