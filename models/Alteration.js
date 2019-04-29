const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const { leaveTypes, leaveStatuses } = require('../data');

//create schema
const AlterationSchema = new Schema({
  leaveId: {
    type: String,
    required: true
  },
  originalDate: {
    type: Date,
    required: true
  },
  originalHour: {
    type: Number,
    required: true
  },
  alternationOption: {
    type: String,
    enum: ['POSTPONE', 'ALTERNATE'],
    required: true
  },
  alterationDate: {
    type: Date,
    required: true
  },
  alterationHour: {
    type: Number,
    required: true
  },
  originalStaff: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  alternatingStaff: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'classes',
    required: true
  },
  accepted: {
    type: Boolean,
    default: false
  }
});

//Object.assign(AlterationSchema.statics, { leaveTypes, leaveStatuses });

module.exports = Alteration = mongoose.model('alterations', AlterationSchema);
