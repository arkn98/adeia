const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ClassSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = Class = mongoose.model('classes', ClassSchema);
