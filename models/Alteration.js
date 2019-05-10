const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const AlterationSchema = new Schema({
  alterationId: {
    type: String,
    required: true,
    unique: true
  },
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
  status: {
    type: String,
    enum: ['WAITING', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'VIEWED'],
    default: 'WAITING'
  },
  leaveApproved: {
    type: String,
    enum: ['WAITING', 'ACCEPTED', 'REJECTED'],
    default: 'WAITING'
  }
});

module.exports = Alteration = mongoose.model('alterations', AlterationSchema);
