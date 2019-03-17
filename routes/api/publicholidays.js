const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const PublicHoliday = require('../../models/PublicHoliday');

//check status of db
router.get('/', (req, res) => {
  PublicHoliday.find({}).then(holidays => {
    if (!holidays) {
      return res.status(404).json({ msg: 'No holidays found' });
    }
  });
});

module.exports = router;
