const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    prevLogins: [
      {
        default: {},
        attemptStatus: { type: String },
        timestamp: { type: String },
        ip: { type: String },
        browser: { type: String },
        os: { type: String }
      }
    ],
    notifications: { type: Array, default: [] },
    cplCredits: {
      type: Number,
      default: 0
    },
    leaveAllotted: {
      type: Schema.Types.Mixed,
      default: {}
    },
    leaveAvailable: {
      type: Schema.Types.Mixed,
      default: {}
    }
  },
  { minimize: false }
);

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
