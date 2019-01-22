const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const TimetableSchema = new Schema({
  class: {
    type: Schema.Types.ObjectId,
    ref: 'classes',
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  hour: {
    type: Number,
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'courses',
    required: true
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  staffRole: {
    type: String,
    enum: ['MAIN', 'ADDITIONAL'],
    default: 'MAIN'
  }
});

module.exports = Timetable = mongoose.model('timetables', TimetableSchema);
