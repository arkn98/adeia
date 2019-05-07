const checkRole = require('./checkRole');
const csvToTimetable = require('./csvToTimetable');
const csvTextToRecords = require('./csvTextToRecords');
const sendEmail = require('./sendEmail');
const sendNotification = require('./sendNotification');
const { getTimetableEntries } = require('./getTimetableEntries');
const getOrdinal = require('./getOrdinal');
const setLeaveStatusBasedOnAlt = require('./setLeaveStatusBasedOnAlt');
const fileDownloadHandler = require('./fileDownloadHandler');

module.exports = {
  checkRole,
  csvToTimetable,
  csvTextToRecords,
  getTimetableEntries,
  sendEmail,
  sendNotification,
  getOrdinal,
  setLeaveStatusBasedOnAlt,
  fileDownloadHandler
};
