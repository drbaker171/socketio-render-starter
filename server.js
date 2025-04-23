# Repository: socketio-render-starter

This is a minimal Socket.IO server app, ready to deploy on Render.

---

## File: server.js
```js
// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Allow cross-origin requests from any origin (so your HTML on Hostinger can connect)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Handle client connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Relay dice rolls to all clients
  socket.on('roll', (rollValue) => {
    console.log(`User ${socket.id} rolled ${rollValue}`);
    io.emit('roll', { id: socket.id, value: rollValue });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Listen on the port provided by Render or fallback to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Socket.IO server running on port ${PORT}`));
```

---

## File: package.json
```json
{
  "name": "socketio-render-starter",
  "version": "1.0.0",
  "description": "Minimal Socket.IO server for Render deployment",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.5.0"
  }
}
```

---

## File: .gitignore
```
node_modules/
```

---

## File: README.md
```markdown
# Socket.IO Render Starter

A minimal Socket.IO server application that's deploy-ready on Render. Ideal for powering a turn-based dice game frontend hosted elsewhere.

## Deploying to Render

1. **Fork or clone** this repository into your GitHub account.
2. **Go to** https://render.com and log in.
3. **Click** on **New Web Service**.
4. **Connect** your GitHub, select this repo.
5. **Configure**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: leave defaults (Free plan is OK)
6. **Create** the service. Render will build and deploy automatically.
7. Once live, your service URL will look like:
   ```
   https://<your-app-name>.onrender.com
   ```

## Using from Your Game Frontend

In your HTML/JS (hosted on Hostinger or anywhere):

```html
<script src="https://<your-app-name>.onrender.com/socket.io/socket.io.js"></script>
<script>
  // Connect to your Render server
  const socket = io('https://<your-app-name>.onrender.com');

  // Send a dice roll
  function rollDice() {
    const rollValue = Math.floor(Math.random() * 6) + 1;
    socket.emit('roll', rollValue);
    displayRoll(rollValue, 'You');
  }

  // Listen for rolls from any player
  socket.on('roll', ({ id, value }) => {
    displayRoll(value, id === socket.id ? 'You' : 'Player ' + id);
  });

  function displayRoll(value, player) {
    console.log(`${player} rolled ${value}`);
    // TODO: update your UI here
  }
</script>
```

Enjoy building your turn-based dice game!
