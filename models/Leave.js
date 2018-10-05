const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
//2 -- rejected (rejected by HOD or alternating staff)
//3 -- cancelled (cancelled by the applicant)

const makeid = () => {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

//create schema
const LeaveSchema = new Schema({
  leaveId: {
    type: String,
    default: makeid()
  },
  staffId: {
    type: Number,
    required: true
  },
  alternatingStaff: [
    {
      staffId: { type: Number, required: true }
    }
  ],
  applyDate: {
    type: Date,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  leaveType: {
    type: String,
    required: true
  },
  noOfDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String
  },
  address: {
    type: String
  },
  status: {
    type: Number,
    default: 0
  }
});

module.exports = Leave = mongoose.model('leaves', LeaveSchema);
