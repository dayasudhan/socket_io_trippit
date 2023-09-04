const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();
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

// http.listen(port, () => {
//   console.log(`Socket.IO server running at http://localhost:${port}/`);
// });

if(process.env.DEV === 'true')
{
  http.listen(3000, () => 
    console.log(`Server is listening on port ${process.env.PORT}.${process.env.DEV} `)
    
  );
}
else{
  exports.handler = serverless(app);
}
