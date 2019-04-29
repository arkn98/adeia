const mongoose = require('mongoose');
const Holiday = require('../../../models/Holiday');
const { holidayTypes } = require('../../../models/Holiday');

const updateHolidays = (req, res) => {
  const { holidayType, holidayList } = req.body;
  let session = null;
  mongoose.startSession().then(_session => {
    session = _session;
    session.startTransaction();
    let bulkOps = [];
    bulkOps.push({
      deleteMany: {
        filter: { holidayType }
      }
    });
    holidayList.forEach(item => {
      bulkOps.push({
        insertOne: {
          document: {
            date: item.date,
            description: item.description,
            holidayType: item.holidayType
          }
        }
      });
    });
    Holiday.bulkWrite(bulkOps, { ordered: true, session })
      .then(() => {
        session.commitTransaction();
        res.json('success');
      })
      .catch(err => {
        session.abortTransaction();
        console.log(err);
      });
  });
};

module.exports = updateHolidays;
