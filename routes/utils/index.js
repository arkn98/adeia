const checkRole = require('./checkRole');
const csvToTimetable = require('./csvToTimetable');
const csvTextToRecords = require('./csvTextToRecords');
const deleteExistingEntries = require('./deleteExistingEntries');
const {
  getTimetableEntries,
  getTimetableDayEntries
} = require('./getTimetableEntries');

module.exports = {
  checkRole,
  csvToTimetable,
  csvTextToRecords,
  deleteExistingEntries,
  getTimetableEntries
};
