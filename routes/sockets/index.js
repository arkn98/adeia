const socketio = require('socket.io');
let io = null;

exports.io = () => {
  return io;
};

exports.init = server => {
  io = socketio.listen(server);
  require('../../config/socket')(io);
  return io;
};
