const Timetable = require('../../../models/Timetable');
const Alteration = require('../../../models/Alteration');
const dayjs = require('dayjs');
const _ = require('underscore');

const getFreeSlots = (req, res) => {
  const data = req.body;
  Timetable.find({ day: dayjs(data.date).day(), staff: data.staff })
    .sort({ hour: 1 })
    .then(timetables => {
      if (timetables) {
        let result = [];
        let staffOccupiedSlots = [];
        let staffUnoccupiedSlots = [];
        timetables.forEach((item, index) => {
          if (item.duration === 1) {
            staffOccupiedSlots.push(item.hour);
          } else {
            for (let i = 1; i <= item.duration; i++) {
              staffOccupiedSlots.push(item.hour + i - 1);
            }
          }
        });

        if (data.halfDayOption === '') {
          staffUnoccupiedSlots = _.difference(
            [1, 2, 3, 4, 5, 6, 7, 8],
            staffOccupiedSlots
          );
        } else if (data.halfDayOption === 'FIRST_HALF') {
          staffUnoccupiedSlots = _.difference([5, 6, 7, 8], staffOccupiedSlots);
        } else if (data.halfDayOption === 'SECOND_HALF') {
          staffUnoccupiedSlots = _.difference([1, 2, 3, 4], staffOccupiedSlots);
        }

        Timetable.find({
          day: dayjs(data.date).day(),
          classGroup: data.classGroupId
        })
          .sort({ hour: 1 })
          .then(classTimetables => {
            let classOccupiedSlots = [];
            classTimetables.forEach((item, index) => {
              if (item.duration === 1) {
                classOccupiedSlots.push(item.hour);
              } else {
                for (let i = 1; i <= item.duration; i++) {
                  classOccupiedSlots.push(item.hour + i - 1);
                }
              }
            });
            result = _.difference(
              staffUnoccupiedSlots,
              _.uniq(classOccupiedSlots)
            );

            Alteration.find({
              alternatingStaff: data.staff,
              alterationDate: data.date,
              status: 'ACCEPTED'
            }).then(alterations => {
              let occupiedSlotsDueToAlterations = [];
              alterations.forEach(item => {
                occupiedSlotsDueToAlterations.push(item.alterationHour);
              });
              result = _.difference(result, occupiedSlotsDueToAlterations);
              return res.status(200).json(result);
            });
          });
      } else {
        return res.status(200).json([]);
      }
    });
};

module.exports = getFreeSlots;
