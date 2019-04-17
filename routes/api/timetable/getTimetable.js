const { validationResult } = require('express-validator/check');
const { getTimetableEntries } = require('../../utils');

const getTimetable = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  getTimetableEntries(req.query.classId).then(result => {
    return res.status(200).json(result);
  });
};

module.exports = getTimetable;
