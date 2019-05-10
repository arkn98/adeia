const mongoose = require('mongoose');
const Leave = require('../../../models/Leave');
const { leaveTypes, leaveStatuses } = require('../../../models/Leave');
const User = require('../../../models/User');

const rejectLeavesHOD = (req, res) => {
  let session = null;
  const { data = [] } = req.body;
  console.log('data', data);
  mongoose.startSession().then(_session => {
    session = _session;
    session.startTransaction();
    let bulkOps = [];
    data.forEach(item => {
      bulkOps.push({
        updateOne: {
          filter: { leaveId: item },
          update: { status: leaveStatuses.REJECTEDBYHOD }
        }
      });
    });
    Leave.bulkWrite(bulkOps, { ordered: true, session })
      .then(() => {
        session.commitTransaction();
        res.json('success');
      })
      .catch(err => {
        session.abortTransaction();
        console.log(err);
        res.status(400);
      });
  });
};

module.exports = rejectLeavesHOD;
