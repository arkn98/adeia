const checkRole = require('./checkRole');
const csvToTimetable = require('./csvToTimetable');
const csvTextToRecords = require('./csvTextToRecords');
const deleteExistingEntries = require('./deleteExistingEntries');
const sendEmail = require('./sendEmail');
const { getTimetableEntries } = require('./getTimetableEntries');

module.exports = {
  checkRole,
  csvToTimetable,
  csvTextToRecords,
  deleteExistingEntries,
  getTimetableEntries,
  sendEmail
};
