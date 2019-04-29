const { validationResult } = require('express-validator/check');
const shortid = require('shortid');
const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Leave = require('../../../models/Leave');
const User = require('../../../models/User');
const Alteration = require('../../../models/Alteration');
const Profile = require('../../../models/Profile');
const { accountTypes } = require('../../../models/User');
const { leaveTypes } = require('../../../models/Leave');
const { sendEmail, sendNotification } = require('../../utils');

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

  slotsToAlternate = JSON.parse(slotsToAlternate);

  let documentUploadPath = '';
  if (typeof req.file !== 'undefined') {
    documentUploadPath = `${req.file.destination}${req.file.filename}`;
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

  Profile.find({ user: req.user.id })
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
                document: documentUploadPath
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
                      originalStaff: req.user.id,
                      alternatingStaff:
                        item.alternationOption === 'POSTPONE'
                          ? req.user.id
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
                      accepted:
                        item.alternationOption === 'POSTPONE' ? true : false
                    });
                  });

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
                        Alteration.find({ _id: { $in: objIds } })
                          .session(session)
                          .populate({
                            path: 'originalStaff',
                            select: 'staffId name email'
                          })
                          .populate({
                            path: 'alternatingStaff',
                            select: 'staffId name email'
                          })
                          .then(staffsToSendNotif => {
                            const promises = [];
                            staffsToSendNotif.forEach(item => {
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
                                    item.leaveId
                                  }`
                                })
                              );
                              promises.push(
                                sendNotification({
                                  user: item.alternatingStaff
                                })
                              );
                            });
                            Promise.all(promises).then(() => {
                              leave.set({ alterations: objIds });
                              leave
                                .save()
                                .then(leaveObj => {
                                  session.commitTransaction();
                                  return res
                                    .status(200)
                                    .json({ leaveId: leaveObj.leaveId });
                                })
                                .catch(err => {
                                  console.log(err);
                                  session.abortTransaction();
                                  return res.status(400);
                                });
                            });
                          });
                      }
                    );
                  } else {
                    session.commitTransaction();
                    return res.status(200).json({ leaveId: leave.leaveId });
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
