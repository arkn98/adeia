require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const https = require('https');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const fileUpload = require('express-fileupload');
const cors = require('cors');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const users = require('./routes/api/users2');
const profile = require('./routes/api/profile');
const admin = require('./routes/api/admin');
const timetable = require('./routes/api/timetable');
const utils = require('./routes/api/utils');
const leave = require('./routes/api/leave');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client', 'build')));
//}

app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

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
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/admin', admin);
app.use('/api/timetable', timetable);
app.use('/api/utils', utils);
app.use('/api/leaves', leave);

const port = process.env.PORT || 5000;

//if (process.env.NODE_ENV === 'production') {
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
//}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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
