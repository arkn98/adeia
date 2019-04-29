const { validationResult } = require('express-validator/check');

const Holiday = require('../../../models/Holiday');

const addHoliday = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  Holiday.findOne({
    date: req.body.date
  }).then(holidayObj => {
    if (holidayObj) {
      errors.date = 'Holiday already exists';
      return res.status(400).json(errors);
    } else {
      const newHoliday = new Holiday({
        date: req.body.date,
        description: req.body.description,
        holidayType: req.body.holidayType
      });
      newHoliday
        .save()
        .then(classObj => res.json('success'))
        .catch(err => console.log(err));
    }
  });
};

module.exports = addHoliday;
