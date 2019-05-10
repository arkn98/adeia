require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const https = require('https');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const cors = require('cors');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('debug', true);

const accountRoutes = require('./routes/api/account');
const classRoutes = require('./routes/api/class');
const courseRoutes = require('./routes/api/course');
const leaveRoutes = require('./routes/api/leave');
const staffRoutes = require('./routes/api/staff');
const timetableRoutes = require('./routes/api/timetable');
const profileRoutes = require('./routes/api/profile');
const leaveTypeRoutes = require('./routes/api/leavetype');
const leaveAllocationRoutes = require('./routes/api/leaveallocation');
const helperRoutes = require('./routes/api/helpers');
const holidayRoutes = require('./routes/api/holiday');
const classGroupRoutes = require('./routes/api/classgroup');
const alterationRoutes = require('./routes/api/alteration');
const { fileDownloadHandler } = require('./routes/utils');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client', 'build')));
//}

//DB  config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
  .connect(db, {
    autoReconnect: true,
    reconnectTries: 100,
    reconnectInterval: 5000
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
app.use(compression());

//passport config
require('./config/passport.js')(passport);

//use routes
app.use('/api/class', classRoutes);
app.use('/api/alteration', alterationRoutes);
app.use('/api/class-group', classGroupRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/leave-type', leaveTypeRoutes);
app.use('/api/leave-allocation', leaveAllocationRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/helpers', helperRoutes);
app.use('/api/holiday', holidayRoutes);
app.get('/uploads', fileDownloadHandler);

const port = process.env.PORT || 5000;

//if (process.env.NODE_ENV === 'production') {
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
//}

let server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

let io = require('./routes/sockets').init(server);

io.sockets.on('connection', socket => {
  socket.on('subscribeToNotifications', data => {
    require('./routes/sockets/notificationHandler')(io, socket, data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

require('./routes/utils/sendNotification');

/* https
  .createServer(
    {
      key: fs.readFileSync('config/server.key'),
      cert: fs.readFileSync('config/server.crt')
    },
    app
  )
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
 */
