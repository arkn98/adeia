require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const compression = require('compression');
const https = require('https');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const admin = require('./routes/api/admin');
const timetable = require('./routes/api/timetable');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

//DB  config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
  .connect(db)
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

const port = process.env.PORT || 5000;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

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
