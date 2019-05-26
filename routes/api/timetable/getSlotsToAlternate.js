const dayjs = require('dayjs');
const _ = require('underscore');

const Holiday = require('../../../models/Holiday');
const User = require('../../../models/User');
const { accountTypes, staffTypes } = require('../../../models/User');
const Leave = require('../../../models/Leave');
const { leaveStatuses } = require('../../../models/Leave');
const Timetable = require('../../../models/Timetable');
const Alteration = require('../../../models/Alteration');
const { holidayTypes } = require('../../../models/Holiday');

const getStaffsAvailable = (classId, applyingStaff, date, hour) => {
  return new Promise((resolve, reject) => {
    const day = dayjs(date).day();
    Timetable.distinct('staff', {
      class: classId,
      staff: { $ne: applyingStaff }
    }).then(results => {
      User.find({ _id: { $in: results } }).then(staffs => {
        let sameClassStaffs = staffs.map(item => item._id.toString());
        Timetable.find({ staff: { $in: results }, day, hour })
          .populate({ path: 'staff', select: 'staffId name _id' })
          .then(tempresults => {
            let staffsHavingClassesOnThatHour = tempresults.map(item =>
              item.staff._id.toString()
            );
            let temp = _.difference(
              sameClassStaffs,
              staffsHavingClassesOnThatHour
            ).map(item => item);
            Leave.find({
              staff: { $in: temp },
              dayRange: { $elemMatch: { $eq: date } },
              status: leaveStatuses.ACCEPTED
            })
              .populate({ path: 'staff', select: 'staffId name _id' })
              .then(leaves => {
                let staffHavingLeaves = [];
                leaves.forEach(item => {
                  staffHavingLeaves.push(item.staff._id.toString());
                });
                temp = _.difference(temp, staffHavingLeaves).map(item => item);
                Alteration.find({
                  alterationDate: date,
                  alterationHour: hour,
                  status: 'ACCEPTED'
                })
                  .populate({
                    path: 'alternatingStaff',
                    select: 'staffId name _id'
                  })
                  .then(alterations => {
                    alterations = alterations
                      .map(item => item.alternatingStaff._id.toString())
                      .filter(item =>
                        temp.includes(item.alternatingStaff._id.toString())
                      );
                    let newtemp = _.difference(temp, alterations).map(
                      item => item
                    );
                    resolve(newtemp.sort());
                  });
              });
          });
      });
    });
  });
};

const getAllStaffsAvailable = (applyingStaff, date, hour) => {
  return new Promise((resolve, reject) => {
    const day = dayjs(date).day();
    User.find({
      _id: { $ne: applyingStaff },
      accountType: accountTypes.STAFF,
      staffType: {
        $in: [
          staffTypes.RT,
          staffTypes.TF,
          staffTypes.RS30,
          staffTypes.RS20,
          staffTypes.RSO
        ]
      }
    }).then(staffs => {
      let sameClassStaffs = staffs.map(item => item._id.toString());
      Timetable.find({ staff: { $in: sameClassStaffs }, day, hour })
        .populate({ path: 'staff', select: 'staffId name _id' })
        .then(tempresults => {
          let staffsHavingClassesOnThatHour = tempresults.map(item =>
            item.staff._id.toString()
          );
          let temp = _.difference(
            sameClassStaffs,
            staffsHavingClassesOnThatHour
          ).map(item => item);

          Leave.find({
            staff: { $in: temp },
            dayRange: { $elemMatch: { $eq: date } },
            status: leaveStatuses.ACCEPTED
          })
            .populate({ path: 'staff', select: 'staffId name _id' })
            .then(leaves => {
              let staffHavingLeaves = [];
              leaves.forEach(item => {
                staffHavingLeaves.push(item.staff._id.toString());
              });
              temp = _.difference(temp, staffHavingLeaves).map(item => item);

              Alteration.find({
                alterationDate: date,
                alterationHour: hour,
                status: 'ACCEPTED'
              })
                .populate({
                  path: 'alternatingStaff',
                  select: 'staffId name _id'
                })
                .then(alterations => {
                  alterations = alterations
                    .map(item => item.alternatingStaff._id.toString())
                    .filter(item =>
                      temp.includes(item.alternatingStaff._id.toString())
                    );
                  let newtemp = _.difference(temp, alterations).map(
                    item => item
                  );
                  resolve(newtemp.sort());
                });
            });
        });
    });
  });
};

const getSlotsToAlternate = (req, res) => {
  const data = req.body;
  let result = [];
  let toDate;
  let tempDayRange = [];
  const { from, noOfDays, halfDayOption } = data;
  if (noOfDays === '0') {
    return res.status(200).json({ slots: [], to: from });
  }

  // add days between from and to excluding public holidays
  Holiday.find({ holidayType: holidayTypes.PUBLIC_HOLIDAY })
    .sort({ date: 1 })
    .lean()
    .then(holidays => {
      if (holidays) {
        let start = dayjs(from);
        let iterator = dayjs(from);
        let noOfDaysAdded = 0;
        let dayRange = [];

        Leave.find({
          staff: req.user.id,
          status: leaveStatuses.ACCEPTED
        }).then(leaves => {
          let leavesAlreadyTaken = leaves.map(x => x.dayRange);
          if (halfDayOption === '') {
            // for every day between from and to, check if it is
            // holiday/weekend and add it to dayrange
            while (noOfDaysAdded < parseInt(noOfDays)) {
              const isInHoliday = holidays.some(x =>
                iterator.isSame(x.date, 'day')
              );
              // TODO: check if saturday is a working day
              const isWeekend = iterator.day() === 0 || iterator.day() === 6;
              if (
                !isInHoliday &&
                !isWeekend &&
                leavesAlreadyTaken.every(
                  x => !x.some(y => iterator.isSame(dayjs(y), 'day'))
                )
              ) {
                dayRange.push(iterator);
                noOfDaysAdded++;
              }
              iterator = iterator.add(1, 'day').clone();
            }
            toDate = dayRange[dayRange.length - 1];
          } else {
            dayRange.push(start);
            toDate = start.clone();
          }

          tempDayRange = dayRange.map(day => day.day());
          Timetable.find({
            staff: req.user._id,
            day: {
              $in: tempDayRange
            },
            hour: {
              $gte:
                halfDayOption !== ''
                  ? halfDayOption === 'FIRST_HALF'
                    ? 0
                    : halfDayOption === 'SECOND_HALF'
                    ? 5
                    : 0
                  : 0,
              $lte:
                halfDayOption !== ''
                  ? halfDayOption === 'FIRST_HALF'
                    ? 4
                    : halfDayOption === 'SECOND_HALF'
                    ? 8
                    : 8
                  : 8
            }
          })
            .sort({ day: 1, hour: 1 })
            .populate({ path: 'class', populate: { path: 'classGroup' } })
            .populate({ path: 'course', select: 'courseCode' })
            .populate({ path: 'staff', select: 'staffId name' })
            .then(slots => {
              // get all slots that need alteration in dayrange
              result = dayRange.map(item => {
                let slot = slots.filter(x => x.day === item.day());
                return {
                  date: item.toDate(),
                  slots: slot !== undefined ? slot : []
                };
              });
              let resultSlots = [];
              let promises = [];
              // for every slot that needs alteration, find all staffs and
              // staffs from same class
              result.forEach((item, index) => {
                if (item.slots.length !== 0) {
                  item.slots.forEach((slotItem, slotIndex) => {
                    if (slotItem.duration === 1) {
                      promises.push(
                        new Promise(resolve => {
                          Promise.all([
                            getAllStaffsAvailable(
                              req.user._id,
                              item.date,
                              slotItem.hour
                            ),
                            // get free staff from same class
                            getStaffsAvailable(
                              slotItem.class._id,
                              req.user._id,
                              item.date,
                              slotItem.hour
                            )
                          ]).then(result => {
                            resultSlots.push({
                              date: item.date,
                              classCode: slotItem.class.classCode,
                              classId: slotItem.class._id,
                              classGroupId: slotItem.class.classGroup._id,
                              hour: slotItem.hour,
                              duration: 1,
                              alternationOption: 'ALTERNATE',
                              modification: {
                                alternateSameClass: '',
                                alternateOthers: '',
                                postponeDate: undefined,
                                postponeHour: '',
                                allStaffsAvailable: result[0],
                                staffsAvailable: result[1],
                                availableSlots: []
                              }
                            });
                            resolve();
                          });
                        })
                      );
                    } else {
                      for (let i = 1; i <= slotItem.duration; i++) {
                        promises.push(
                          new Promise(resolve => {
                            Promise.all([
                              getAllStaffsAvailable(
                                req.user._id,
                                item.date,
                                slotItem.hour + i - 1
                              ),
                              getStaffsAvailable(
                                slotItem.class._id,
                                req.user._id,
                                item.date,
                                slotItem.hour + i - 1
                              )
                            ]).then(result => {
                              resultSlots.push({
                                date: item.date,
                                classCode: slotItem.class.classCode,
                                classId: slotItem.class._id,
                                classGroupId: slotItem.class.classGroup._id,
                                hour: slotItem.hour + i - 1,
                                duration: 1,
                                alternationOption: 'ALTERNATE',
                                modification: {
                                  alternateSameClass: '',
                                  alternateOthers: '',
                                  postponeDate: undefined,
                                  postponeHour: '',
                                  allStaffsAvailable: result[0],
                                  staffsAvailable: result[1],
                                  availableSlots: []
                                }
                              });
                              resolve();
                            });
                          })
                        );
                      }
                    }
                  });
                }
              });
              Promise.all(promises).then(() => {
                return res.status(200).json({
                  slots: resultSlots.sort((a, b) => {
                    if (dayjs(a.date).isBefore(dayjs(b.date), 'day')) return -1;
                    if (dayjs(a.date).isAfter(dayjs(b.date), 'day')) return 1;
                    return 0;
                  }),
                  to: toDate,
                  dayRange
                });
              });
            });
        });
      }
    });
};

module.exports = getSlotsToAlternate;
