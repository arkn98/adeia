const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/uploads', {
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/socket.io', {
      target: 'http://localhost:5000',
      ws: true,
      changeOrigin: true
    })
  );
};
