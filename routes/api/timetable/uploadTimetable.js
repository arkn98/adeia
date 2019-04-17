const { validationResult } = require('express-validator/check');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const xlsx = require('node-xlsx').default;

const { csvToTimetable } = require('../../utils');

const uploadTimetable = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  let uploadFile = req.files.file;
  let fileName = uploadFile.name;
  let data = uploadFile.data;
  const toPath = `${__dirname}/../../../uploads/${Date.now()}-${fileName}`;
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
        if (fs.existsSync(toPath)) {
          const fileData = fs.readFileSync(toPath);
          const records = parse(fileData, {
            skip_empty_lines: true
          });
          // add xlsx parsing
          const result = csvToTimetable(records);
          return res.json(result);
        }
        return res.status(500).json({ msg: 'error' });
      });
    });
  });
};

module.exports = uploadTimetable;
