const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { leaveTypes } = require('../data');

const LeaveTypeSchema = new Schema({
  leaveType: {
    type: String,
    enum: Object.values(leaveTypes),
    required: true,
    unique: true
  },
  noOfDays: {
    type: Number,
    required: true
  }
});

module.exports = LeaveType = mongoose.model('leaveTypes', LeaveTypeSchema);
