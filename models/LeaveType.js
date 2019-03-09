const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const LeaveTypeSchema = new Schema({
  leaveType: {
    type: String,
    required: true,
    unique: true
  },
  noOfDays: {
    type: Number,
    required: true
  }
});

module.exports = LeaveType = mongoose.model('leave_type', LeaveTypeSchema);
