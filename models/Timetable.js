const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const TimetableSchema = new Schema({
  class: {
    type: Schema.Types.ObjectId,
    ref: 'classes'
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'courses'
  },
  batch: [
    {
      number: {
        type: Number,
        required: true
      },
      handlingStaff: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      additionalStaff: [
        {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        }
      ]
    }
  ]
});

module.exports = Timetable = mongoose.model('timetables', TimetableSchema);
