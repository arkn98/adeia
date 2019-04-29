const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ClassGroupSchema = new Schema({
  classGroupCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nameOfClassGroup: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = ClassGroup = mongoose.model('classgroups', ClassGroupSchema);
