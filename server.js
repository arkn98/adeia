require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const admin = require('./routes/api/admin');
const timetable = require('./routes/api/timetable');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB  config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

mongoose.set('useCreateIndex', true);

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport.js')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/admin', admin);
app.use('/api/timetable', timetable);

const port = process.env.PORT || 5000;

/* app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); */

https
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
