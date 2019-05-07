const dayjs = require('dayjs');
const shortid = require('shortid');
const Alteration = require('../../../models/Alteration');
const {
  setLeaveStatusBasedOnAlt,
  sendEmail,
  sendNotification,
  getOrdinal
} = require('../../utils');

const setAlterationRejected = (req, res) => {
  const alterationId = req.query.alterationId;
  Alteration.findOne({ alterationId })
    .populate({ path: 'originalStaff', select: 'staffId name email' })
    .populate({ path: 'alternatingStaff', select: 'staffId name email' })
    .populate({ path: 'class' })
    .then(alteration => {
      if (alteration) {
        if (alteration.status === 'WAITING' || alteration.status === 'VIEWED') {
          alteration.set({ status: 'REJECTED' });
          alteration
            .save()
            .then(alteration => {
              setLeaveStatusBasedOnAlt(alteration.leaveId).then(() =>
                res.status(200).json('success')
              );
              let promises = [];
              promises.push(
                sendNotification({
                  user: req.user._id,
                  data: {
                    notificationId: shortid.generate(),
                    isNew: true,
                    link: `/dashboard/alteration/${alteration.alterationId}`,
                    title: 'Alteration rejected',
                    message: `You rejected alteration ${
                      alteration.alterationId
                    } from ${
                      alteration.originalStaff.name
                    } scheduled on ${dayjs(alteration.alterationDate).format(
                      'DD-MMM-YYYY'
                    )} - ${getOrdinal(alteration.alterationHour)} hour`,
                    type: 'info',
                    time: dayjs()
                      .format('DD-MMM-YYYY hh:mm A')
                      .toString()
                  }
                })
              );
              promises.push(
                sendEmail({
                  to: req.user.email,
                  subject: `LMS - Alteration rejected`,
                  body: `You rejected alteration ${
                    alteration.alterationId
                  } from ${alteration.originalStaff.name} scheduled on ${dayjs(
                    alteration.alterationDate
                  ).format('DD-MMM-YYYY')} - ${getOrdinal(
                    alteration.alterationHour
                  )} hour. To view details follow the below link:<br> http://localhost:3000/dashboard/alteration/${
                    alteration.alterationId
                  }`
                })
              );
              promises.push(
                sendNotification({
                  user: alteration.originalStaff._id,
                  data: {
                    notificationId: shortid.generate(),
                    isNew: true,
                    link: `/dashboard/leave/${alteration.leaveId}`,
                    title: 'Alteration rejected',
                    message: `Your alteration for ${
                      alteration.leaveId
                    } (Alteration ID - ${
                      alteration.alterationId
                    }) was rejected by ${
                      alteration.alternatingStaff.name
                    }, which was scheduled on ${dayjs(
                      alteration.alterationDate
                    ).format('DD-MMM-YYYY')} - ${getOrdinal(
                      alteration.alterationHour
                    )} hour`,
                    type: 'info',
                    time: dayjs()
                      .format('DD-MMM-YYYY hh:mm A')
                      .toString()
                  }
                })
              );
              promises.push(
                sendEmail({
                  to: alteration.originalStaff.email,
                  subject: `LMS - Alteration rejected`,
                  body: `Your alteration for ${
                    alteration.leaveId
                  } (Alteration ID - ${
                    alteration.alterationId
                  }) was rejected by ${
                    alteration.alternatingStaff.name
                  }, which was scheduled on ${dayjs(
                    alteration.alterationDate
                  ).format('DD-MMM-YYYY')} - ${getOrdinal(
                    alteration.alterationHour
                  )} hour. To view details follow the below link:<br> http://localhost:3000/dashboard/leave/${
                    alteration.leaveId
                  }`
                })
              );
            })
            .catch(err => {
              console.log(err);
              return res.status(400);
            });
        }
        return res.status(400);
      }
      return res.status(400);
    });
};

module.exports = setAlterationRejected;
