const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//account type
//0 -- admin
//1 -- office
//2 -- staff

//activated
//0 -- not activated
//1 -- activated

//staff type
//0 -- regular teaching -- rt
//1 -- regular non teaching -- rnt
//2 -- teaching fellows -- tf
//3 -- non teaching (no leave) -- nt
//4 -- research scholars - 30 days -- rs30
//5 -- research scholars - 20 days -- rs20
//6 -- research scholars - others (6 days) -- rso
//7 -- others -- oth

//create schema
const UserSchema = new Schema(
  {
    staffId: {
      type: String,
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
    },
    staffType: {
      type: String
    }
  },
  { minimize: false }
);

module.exports = User = mongoose.model('users', UserSchema);
