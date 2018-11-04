const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ClassSchema = new Schema({
  nameOfClass: {
    type: String,
    required: true,
    trim: true
  },
  classCode: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

module.exports = Class = mongoose.model('classes', ClassSchema);
