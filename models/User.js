const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//account type
//0 -- admin
//1 -- office
//2 -- staff

//activated
//0 -- not activated
//1 -- activated

//create schema
const UserSchema = new Schema({
  staffId: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: 'example@example.com',
    required: true
  },
  password: {
    type: String,
    default: `${Math.floor(Math.random() * 90000) + 10000}`,
    required: true
  },
  accountType: {
    type: Number,
    default: 2,
    required: true
  },
  activated: {
    type: Number,
    default: 0,
    required: true
  }
});

module.exports = User = mongoose.model('users', UserSchema);
