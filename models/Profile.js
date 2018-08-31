const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//account type
//0 -- admin
//1 -- office
//2 -- staff

//create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  cplCredits: {
    type: Number,
    default: null
  },
  leaveAvailable: {
    type: Schema.Types.Mixed
  },
  leaveList: {
    rejected: [
      {
        leave: {
          type: Schema.Types.ObjectId,
          ref: 'leave'
        }
      }
    ],
    pending: [
      {
        leave: {
          type: Schema.Types.ObjectId,
          ref: 'leave'
        }
      }
    ],
    accepted: [
      {
        leave: {
          type: Schema.Types.ObjectId,
          ref: 'leave'
        }
      }
    ]
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
