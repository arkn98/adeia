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
//2 -- rejected by HOD
//3 -- rejected by alternating staff
//4 -- cancelled (cancelled by the applicant)

const makeId = () => {
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
    default: makeId()
  },
  staffId: {
    type: String,
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
  },
  document: {
    // path to uploaded document
    type: String,
    default: ''
  }
});

module.exports = Leave = mongoose.model('leaves', LeaveSchema);
