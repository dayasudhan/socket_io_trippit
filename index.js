const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();
const port = process.env.PORT || 3001;
const msgs = [];
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/test', (req, res) => res.send('Namaste Dayasudhan ??'));
io.on('connection', (socket) => {
  console.log('a user connected ',socket.id);
  socket.on('subscribe_rides',m=> {
    console.log("message: ",m);
    const obj = JSON.parse(m);
    const ride_id = obj.ride_id;
    console.log(socket.id+" user subscribing for rides with id ",ride_id)
    socket.on('rides_'+ride_id, m2=>{
        console.log(socket.id+" received from topic rides_"+ride_id+" data- ",m2);
        socket.broadcast.emit('rides_'+ride_id, m2);
    });
  });
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


http.listen(port, () =>
   console.log(`Server is listening on port ${process.env.PORT}.${process.env.DEV} `)

 );
