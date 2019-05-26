const { validationResult } = require('express-validator/check');
const shortid = require('shortid');
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');

const Leave = require('../../../models/Leave');
const Timetable = require('../../../models/Timetable');
const User = require('../../../models/User');
const Alteration = require('../../../models/Alteration');
const Profile = require('../../../models/Profile');
const { accountTypes } = require('../../../models/User');
const { leaveTypes } = require('../../../models/Leave');
const { sendEmail, sendNotification, getOrdinal } = require('../../utils');

dayjs.extend(advancedFormat);

const addLeave = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  errors.slotsToAlternate = [];

  let {
    staffId,
    staff,
    leaveType,
    isVacation,
    halfDayOption,
    noOfDays,
    dayRange,
    reason,
    address,
    slotsToAlternate
  } = req.body;

  dayRange = JSON.parse(dayRange);
  slotsToAlternate = JSON.parse(slotsToAlternate);

  let documentUploadPath = '';
  if (typeof req.file !== 'undefined') {
    documentUploadPath = `${req.file.filename}`;
    /*${req.file.destination}*/
  }

  if (
    (leaveType === leaveTypes.SCL || leaveType === leaveTypes.OD) &&
    documentUploadPath === ''
  ) {
    errors.document = 'Supporting document is required';
    return res.status(400).json(errors);
  }

  if (!(noOfDays === '0.5' || Number.isInteger(parseInt(noOfDays)))) {
    errors.noOfDays = 'Enter a valid number or 0.5';
    return res.status(400).json(errors);
  }

  if (!Array.isArray(dayRange) || dayRange.length === 0) {
    errors.from = 'Select a valid date';
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user._id })
    .populate({
      path: 'leaveAllocation',
      populate: { path: 'leaveTypesAllowed' }
    })
    .then(profile => {
      let quotaAvailed = 0;
      let quotaAllowed = 0;
      if (leaveType !== leaveTypes.CPL) {
        quotaAllowed = profile.leaveAllocation.leaveTypesAllowed.find(
          x => x.leaveType === leaveType
        ).noOfDays;

        quotaAvailed = profile.leaveAvailed.find(x => x.leaveType === leaveType)
          .noOfDays;
      } else {
        quotaAllowed = profile.cplCredits;
        quotaAvailed = 0;
      }

      if (quotaAllowed - quotaAvailed <= 0) {
        errors.noOfDays = 'Quota over';
        return res.status(400).json(errors);
      } else {
        let session = null;
        mongoose.startSession().then(_session => {
          session = _session;
          session.startTransaction();
          let status = 'WAITING';
          if (
            slotsToAlternate.length === 0 ||
            slotsToAlternate.every(x => x.alternationOption === 'POSTPONE')
          ) {
            status = 'WAITINGHODAPPROVAL';
          }
          Leave.create(
            [
              {
                leaveId: shortid.generate(),
                staff,
                staffId,
                applyDate: new Date(),
                dayRange,
                halfDaySession: halfDayOption,
                leaveType,
                noOfDays,
                reason,
                isVacation,
                address,
                document: documentUploadPath,
                isDocumentProvided: documentUploadPath !== '',
                status
              }
            ],
            { session }
          )
            .then(leaveArray => {
              User.find({ accountType: accountTypes.STAFF })
                .session(session)
                .then(staffList => {
                  let leave = leaveArray[0];
                  toAddAlterations = [];
                  slotsToAlternate.forEach((item, index) => {
                    toAddAlterations.push({
                      alterationId: shortid.generate(),
                      leaveId: leave.leaveId,
                      originalDate: item.date,
                      originalHour: item.hour,
                      alterationDate:
                        item.alternationOption === 'POSTPONE'
                          ? item.modification.postponeDate
                          : item.date,
                      alterationHour:
                        item.alternationOption === 'POSTPONE'
                          ? item.modification.postponeHour
                          : item.hour,
                      alternationOption: item.alternationOption,
                      originalStaff: req.user._id,
                      alternatingStaff:
                        item.alternationOption === 'POSTPONE'
                          ? req.user._id
                          : item.modification.alternateSameClass !== ''
                          ? staffList.find(
                              x =>
                                x.staffId ===
                                item.modification.alternateSameClass
                            )._id
                          : staffList.find(
                              x =>
                                x.staffId === item.modification.alternateOthers
                            )._id,
                      class: item.classId,
                      status:
                        item.alternationOption === 'POSTPONE'
                          ? 'ACCEPTED'
                          : 'WAITING'
                    });
                  });

                  const promises = [];
                  promises.push(
                    sendNotification({
                      user: req.user._id,
                      data: {
                        notificationId: shortid.generate(),
                        isNew: true,
                        link: `/dashboard/leave/${leave.leaveId}`,
                        title: 'Leave Application',
                        message: `Your leave application ${
                          leave.leaveId
                        } has been successfully submitted and is under processing. Click here to view status`,
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
                      subject: `LMS - Leave application submitted`,
                      body: `Your leave application ${
                        leave.leaveId
                      } has been successfully submitted and is under processing. <br>To view the status of your application, follow the below link:<br> http://localhost:3000//dashboard/leave/${
                        leave.leaveId
                      }`
                    })
                  );
                  if (
                    Array.isArray(toAddAlterations) &&
                    toAddAlterations.length !== 0
                  ) {
                    Alteration.create(toAddAlterations, { session }).then(
                      alterations => {
                        let objIds = [];
                        alterations.forEach(item => {
                          objIds.push(item._id);
                        });
                        leave.set({ alterations: objIds });
                        leave
                          .save()
                          .then(leaveObj => {
                            res.status(200).json({ leaveId: leaveObj.leaveId });
                            session.commitTransaction();
                            Alteration.find({
                              _id: { $in: objIds },
                              alternationOption: 'ALTERNATE'
                            })
                              /* .session(session) */
                              .populate({
                                path: 'originalStaff',
                                select: 'staffId name email'
                              })
                              .populate({
                                path: 'alternatingStaff',
                                select: 'staffId name email'
                              })
                              .then(staffToSendNotif => {
                                const promises = [];
                                staffToSendNotif.forEach(item => {
                                  promises.push(
                                    sendEmail({
                                      to: item.alternatingStaff.email,
                                      subject: `LMS - ${
                                        item.originalStaff.name
                                      } has requested your approval for an alteration`,
                                      body: `<h3>Alteration request</h3><br>Requested by: <b>${
                                        item.originalStaff.name
                                      } (${
                                        item.originalStaff.staffId
                                      })</b><br>Original Date: <b>${dayjs(
                                        item.originalDate
                                      )
                                        .format('DD-MMM-YYYY')
                                        .toString()}</b><br>Original Hour: <b>${
                                        item.originalHour
                                      }</b><br>Alteration Date: <b>${dayjs(
                                        item.alterationDate
                                      )
                                        .format('DD-MMM-YYYY')
                                        .toString()}</b><br>Alteration Hour: <b>${
                                        item.alterationHour
                                      }</b><br><br>To accept/reject please follow the below link: http://localhost:3000/dashboard/alteration/${
                                        item.alterationId
                                      }`
                                    })
                                  );
                                  promises.push(
                                    sendNotification({
                                      user: item.alternatingStaff,
                                      data: {
                                        notificationId: shortid.generate(),
                                        isNew: true,
                                        link: `/dashboard/alteration/${
                                          item.alterationId
                                        }`,
                                        title: 'Alteration Request',
                                        message: `${
                                          item.originalStaff.name
                                        } has requested alteration for ${dayjs(
                                          item.alterationDate
                                        )
                                          .format('Do of MMM, YY')
                                          .toString()} - ${getOrdinal(
                                          parseInt(item.alterationHour)
                                        )} hour.`,
                                        type: 'info',
                                        time: dayjs()
                                          .format('DD-MMM-YYYY hh:mm A')
                                          .toString()
                                      }
                                    })
                                  );
                                });
                              });
                          })
                          .catch(err => {
                            console.log(err);
                            session.abortTransaction();
                            return res.status(400);
                          });
                      }
                    );
                    Promise.all(promises)
                      .then(() => {
                        return;
                      })
                      .catch(err => {
                        console.log(err);
                        return;
                      });
                  } else {
                    res.status(200).json({ leaveId: leave.leaveId });
                    session.commitTransaction();
                    Promise.all(promises)
                      .then(() => {
                        return;
                      })
                      .catch(err => {
                        console.log(err);
                        return;
                      });
                  }
                });
            })
            .catch(err => {
              console.log(err);
              session.abortTransaction();
              return res.status(400);
            });
        });
      }
    });
};

module.exports = addLeave;
