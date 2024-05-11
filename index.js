const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log(data.type);

    switch (data.type) {
      case 'addUser':
        'handleAddUser();'
        break;
      default:
        console.log('No handler against type', data?.type)
    }

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('connectionId', (id) => {
    console.log(`Received userId: ${id}`);

    // wss.clients.forEach((client) => {
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(message);
    //   }
    // });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/testing', (req, res) => {
  res.send('server working');
});

server.listen(5000, (port) => {
  console.log(`server started on port ${5000}`)
})