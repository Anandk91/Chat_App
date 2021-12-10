// Node server which will handle socket io connections


const io = require('socket.io')(8000, {
  cors: {
    origin: '*',
  }
});

const users = {};

io.on('connection', socket =>{
  // console.log("Hello how are you");
  socket.on('new-user-joined', nam =>{
    // console.log("New user ", nam);
    users[socket.id] = nam;
    socket.broadcast.emit('user-joined', nam);
  });

  socket.on('send', message =>{
    socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
  });

  socket.on('disconnect', message =>{
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
})
