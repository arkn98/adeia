require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const compression = require('compression');
const https = require('https');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const xlsx = require('node-xlsx').default;

const fileUpload = require('express-fileupload');
const cors = require('cors');

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
}

app.use(fileUpload());

app.post(
  '/upload',
  /* cors(),*/ (req, res) => {
    let uploadFile = req.files.file;
    let fileName = req.files.file.name;
    let data = req.files.file.data;
    const toPath = `${__dirname}/uploads/${fileName}`;
    uploadFile.mv(toPath, err => {
      if (err) {
        return res.status(500).send(err);
      }
      const stream = fs.createWriteStream(toPath, { encoding: 'utf8' });
      stream.once('open', () => {
        stream.write(data, writeErr => {
          if (writeErr) {
            return res.status(500).send(err);
          }
          stream.close();
          console.log(
            `File ${
              fs.existsSync(toPath) ? 'exists' : 'does NOT exist'
            } under ${toPath}.`
          );
          if (fs.existsSync(toPath)) {
            console.log(`Content of ${toPath}:`);
            //console.log(fs.readFileSync(toPath).toString());
            const workSheetsFromFile = xlsx.parse(fs.readFileSync(toPath));
            console.log(workSheetsFromFile.SheetNames);
          }
        });
      });

      res.json({
        file: `public/${req.files.file.name}`
      });
    });
  }
);

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

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

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
