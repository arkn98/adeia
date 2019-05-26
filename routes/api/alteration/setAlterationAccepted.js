const dayjs = require('dayjs');
const shortid = require('shortid');
const Alteration = require('../../../models/Alteration');
const Leave = require('../../../models/Leave');
const {
  sendEmail,
  sendNotification,
  getOrdinal,
  setLeaveStatusBasedOnAlt
} = require('../../utils');
const { leaveStatuses } = require('../../../data');

const setAlterationAccepted = (req, res) => {
  const alterationId = req.query.alterationId;
  Alteration.findOne({ alterationId })
    .populate({ path: 'originalStaff', select: 'staffId name email' })
    .populate({ path: 'alternatingStaff', select: 'staffId name email' })
    .populate({ path: 'class' })
    .then(alteration => {
      if (alteration) {
        if (alteration.status === 'WAITING' || alteration.status === 'VIEWED') {
          alteration.set({ status: 'ACCEPTED' });
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
                    title: 'Alteration accepted',
                    message: `You accepted alteration ${
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
                  subject: `LMS - Alteration accepted`,
                  body: `You accepted alteration ${
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
                    title: 'Alteration accepted',
                    message: `Your alteration for ${
                      alteration.leaveId
                    } (Alteration ID - ${
                      alteration.alterationId
                    }) was accepted by ${
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
                  subject: `LMS - Alteration accepted`,
                  body: `Your alteration for ${
                    alteration.leaveId
                  } (Alteration ID - ${
                    alteration.alterationId
                  }) was accepted by ${
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
              Promise.all(promises);
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

module.exports = setAlterationAccepted;
