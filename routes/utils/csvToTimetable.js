const csvTextToRecords = require('./csvTextToRecords');

const csvToTimetable = data => {
  let result = [];

  const compare = (a, b) => {
    let aDay = a[1];
    let bDay = b[1];
    let aHour = a[2];
    let bHour = b[2];
    if (aDay === bDay) {
      return aHour < bHour ? -1 : aHour > bHour ? 1 : 0;
    } else {
      return aDay < bDay ? -1 : 1;
    }
  };

  // remove header from csv data
  //data = data.splice(0, 1);
  const sorted = data.sort(compare);

  for (let i = 1; i <= 5; i = i + 1) {
    result.push(csvTextToRecords(sorted, i));
  }
  return result;
};

module.exports = csvToTimetable;
