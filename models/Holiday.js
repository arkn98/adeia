const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { holidayTypes } = require('../data');

//create schema
const HolidaySchema = new Schema(
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
    },
    holidayType: {
      type: String,
      required: true,
      default: holidayTypes.PUBLIC_HOLIDAY,
      enum: Object.values(holidayTypes)
    }
  },
  { minimize: false }
);

module.exports = Holiday = mongoose.model('holidays', HolidaySchema);
