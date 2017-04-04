var io = require('socket.io')();

io.on('connection', function (socket) {

    socket.on('add-notification', function(data) {
      // socket.data = data;
      // io.emit('add-notification', data);
      socket.broadcast.emit('add-notification', data);
    });

});

module.exports = io;
