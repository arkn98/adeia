const Holiday = require('../../../models/Holiday');

const getAllHolidays = (req, res) => {
  Holiday.find({})
    .sort({ date: 1 })
    .lean()
    .then(holidays => {
      if (!holidays) {
        errors.msg = 'No holiday found';
        return res.status(404).json();
      } else {
        res.json(holidays);
      }
    })
    .catch(err => res.status(404).json(err));
};

module.exports = getAllHolidays;
