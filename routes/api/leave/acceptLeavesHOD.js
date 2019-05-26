const mongoose = require('mongoose');
const Leave = require('../../../models/Leave');
const { leaveStatuses } = require('../../../models/Leave');
const Profile = require('../../../models/Profile');
const dayjs = require('dayjs');
const shortid = require('shortid');
const Alteration = require('../../../models/Alteration');
const { sendEmail, sendNotification } = require('../../utils');

const acceptLeavesHOD = (req, res) => {
  let session = null;
  const { data = [] } = req.body;
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
          .populate({
            path: 'staff',
            select: 'email name staffId staffType _id'
          })
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
          })
          .then(leaveList => {
            if (leaveList) {
              let notificationsToSend = [];
              let emailsToSend = [];
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
                notificationsToSend.push({
                  user: item.staff._id,
                  data: {
                    notificationId: shortid.generate(),
                    isNew: true,
                    link: `/dashboard/leave/${item.leaveId}`,
                    title: 'Leave approved',
                    message: `Your leave application ${
                      item.leaveId
                    } was approved by the HOD.`,
                    type: 'info',
                    time: dayjs()
                      .format('DD-MMM-YYYY hh:mm A')
                      .toString()
                  }
                });
                emailsToSend.push({
                  to: item.staff.email,
                  subject: `LMS - Leave accepted`,
                  body: `Your leave application ${
                    item.leaveId
                  } was approved by the HOD. To view details follow the below link:<br> http://localhost:3000/dashboard/leave/${
                    item.leaveId
                  }`
                });
                item.alterations.forEach(altitem => {
                  alterationBulkOps.push({
                    updateOne: {
                      filter: { _id: altitem._id },
                      update: { leaveApproved: 'ACCEPTED' }
                    }
                  });
                  notificationsToSend.push({
                    user: altitem.alternatingStaff._id,
                    data: {
                      notificationId: shortid.generate(),
                      isNew: true,
                      link: `/dashboard/alteration/${altitem.alterationId}`,
                      title: 'Alteration approved',
                      message: `The leave ${
                        altitem.leaveId
                      } associated with your alteration ${
                        altitem.alterationId
                      } was approved by the HOD.`,
                      type: 'info',
                      time: dayjs()
                        .format('DD-MMM-YYYY hh:mm A')
                        .toString()
                    }
                  });
                  emailsToSend.push({
                    to: altitem.alternatingStaff.email,
                    subject: `LMS - Leave associated with your alteration approved`,
                    body: `The leave ${
                      altitem.leaveId
                    } associated with your alteration ${
                      altitem.alterationId
                    } was approved by the HOD. To view details follow the below link:<br> http://localhost:3000/dashboard/alteration/${
                      altitem.alterationId
                    }`
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
                      res.json('success');
                      Promise.all(
                        ...notificationsToSend.map(notifData =>
                          sendNotification(notifData)
                        ),
                        ...emailsToSend.map(emailData => sendEmail(emailData))
                      );
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
