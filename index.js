const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const msgs = [];
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', m => {
    msgs.push(m);
    const { data, token } = m;
    console.log("message",m)
    console.log("message2",data,token)
    socket.broadcast.emit('chat message', m);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
