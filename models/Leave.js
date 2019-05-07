const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { leaveTypes, leaveStatuses } = require('../data');

//leave type
//1 -- Casual Leave -- cl -
//2 -- Compensation Leave -- cpl
//3 -- Earn Leave -- el
//4 -- Medical Leave -- ml
//5 -- On Duty -- od
//6 -- Restricted Holiday -- rh
//7 -- Special Casual Leave -- scl
//8 -- Casual Leave - 30 Days -- cl30
//9 -- Casual Leave - 20 Days -- cl20
//10 - Casual Leave - 6 Days -- cl6

//leave status
//0 -- waiting (just applied / waiting for alterations to be accepted)
//1 -- accepted
//2 -- rejected by HOD
//3 -- rejected by alternating staff
//4 -- cancelled (cancelled by the applicant)

//create schema
const LeaveSchema = new Schema({
  leaveId: {
    type: String,
    required: true,
    unique: true
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  applyDate: {
    type: Date,
    required: true
  },
  dayRange: [
    {
      type: Date
    }
  ],
  halfDaySession: {
    type: String,
    default: ''
  },
  leaveType: {
    type: String,
    enum: Object.values(leaveTypes),
    required: true
  },
  noOfDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String
  },
  isVacation: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: Object.values(leaveStatuses),
    default: leaveStatuses.WAITING
  },
  document: {
    // path to uploaded document
    type: String,
    default: ''
  },
  isDocumentProvided: { type: Boolean, default: false },
  alterations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'alterations'
    }
  ]
});

Object.assign(LeaveSchema.statics, { leaveTypes, leaveStatuses });

module.exports = Leave = mongoose.model('leaves', LeaveSchema);
