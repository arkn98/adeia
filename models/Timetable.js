const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const TimetableSchema = new Schema({
  class: {
    type: Schema.Types.ObjectId,
    ref: 'classes',
    unique: true,
    required: true
  },
  classCode: {
    type: String,
    required: true
  },
  timetable: [
    [
      {
        courseCode: {
          type: Schema.Types.ObjectId,
          ref: 'courses'
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        ]
      }
    ]
  ]
});

module.exports = Timetable = mongoose.model('timetables', TimetableSchema);
