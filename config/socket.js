const crypto = require('crypto');
const User = require('../models/User');

module.exports = io => {
  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      const token = socket.handshake.query.token;
      let hash = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      User.findOne({ OTToken: hash }).then(user => {
        if (!user) {
          return next(new Error('Unauthorized'));
        }
        console.log('authorized');
        next();
      });
    } else {
      return next(new Error('Unauthorized'));
    }
  });
};
