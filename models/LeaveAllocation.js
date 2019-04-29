const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { staffTypes } = require('../data');

const LeaveAllocationSchema = new Schema({
  staffType: {
    type: String,
    enum: Object.values(staffTypes),
    unique: true,
    required: true
  },
  leaveTypesAllowed: [
    {
      type: Schema.Types.ObjectId,
      ref: 'leaveTypes'
    }
  ]
});

Object.assign(LeaveAllocationSchema.statics, { staffTypes });

module.exports = LeaveAllocation = mongoose.model(
  'leaveallocations',
  LeaveAllocationSchema
);
