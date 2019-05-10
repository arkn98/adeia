const mongoose = require('mongoose');
const Leave = require('../../../models/Leave');
const { leaveTypes, leaveStatuses } = require('../../../models/Leave');
const User = require('../../../models/User');
const Profile = require('../../../models/Profile');
const Alteration = require('../../../models/Alteration');

const acceptLeavesHOD = (req, res) => {
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
          update: { status: leaveStatuses.ACCEPTED }
        }
      });
    });
    Leave.bulkWrite(bulkOps, { ordered: true, session })
      .then(() => {
        Leave.find({ leaveId: { $in: data } })
          /* .populate({ path: 'staff', select: 'name staffId staffType' })
          .populate({
            path: 'alterations',
            populate: { path: 'class' }
          })
          .populate({
            path: 'alterations',
            populate: { path: 'originalStaff' }
          })
          .populate({
            path: 'alterations',
            populate: { path: 'alternatingStaff' }
          }) */
          .then(leaveList => {
            if (leaveList) {
              let profileBulkOps = [];
              let alterationBulkOps = [];
              leaveList.forEach(item => {
                profileBulkOps.push({
                  updateOne: {
                    filter: { user: item.staff },
                    update: {
                      $inc: { 'leaveAvailed.$[item].noOfDays': item.noOfDays }
                    },
                    arrayFilters: [
                      { 'item.leaveType': { $eq: item.leaveType } }
                    ]
                  }
                });
                item.alterations.forEach(altitem => {
                  alterationBulkOps.push({
                    updateOne: {
                      filter: { _id: altitem },
                      update: { leaveApproved: 'ACCEPTED' }
                    }
                  });
                });
              });
              Profile.bulkWrite(profileBulkOps, {
                ordered: true,
                session
              })
                .then(() => {
                  Alteration.bulkWrite(alterationBulkOps, {
                    ordered: true,
                    session
                  })
                    .then(() => {
                      session.commitTransaction();
                      return res.json('success');
                    })
                    .catch(err => {
                      session.abortTransaction();
                      console.log(err);
                      return res.status(400);
                    });
                })
                .catch(err => {
                  session.abortTransaction();
                  console.log(err);
                  return res.status(400);
                });
            }
          });
        /* .catch(err => {
            session.abortTransaction();
            console.log(err);
            return res.status(400);
          }); */
      })
      .catch(err => {
        session.abortTransaction();
        console.log(err);
        return res.status(400);
      });
  });
};

module.exports = acceptLeavesHOD;
