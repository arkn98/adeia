const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const CourseSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = Course = mongoose.model('courses', CourseSchema);
