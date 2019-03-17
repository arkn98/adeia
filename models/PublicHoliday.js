const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const PublicHolidaySchema = new Schema(
  {
    date: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: 'DD-MM-YYYY'
    },
    description: {
      type: String,
      required: true
    }
  },
  { minimize: false }
);

module.exports = PublicHoliday = mongoose.model(
  'publicholidays',
  PublicHolidaySchema
);
