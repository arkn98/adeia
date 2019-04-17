const csvTextToRecords = (data, day) => {
  let newRecords = [];
  data.forEach(entry => {
    let csvDay = entry[1];
    if (parseInt(csvDay) === day) {
      let hour = entry[2];
      let duration = entry[3];
      let courseCode = entry[4];
      let staffId = entry[5];
      let additionalStaff = entry[6].split(',');
      //check if hour already exists in newRecords
      let index = newRecords.findIndex(
        x => x.start === parseInt(hour) && x.duration === parseInt(duration)
      );
      if (index === -1) {
        let newHour = {
          start: parseInt(hour),
          duration: parseInt(duration),
          course: []
        };
        let courseObj = {
          courseCode,
          handlingStaff: staffId,
          additionalStaff
        };
        newHour.course.push(courseObj);
        newRecords.push(newHour);
      } else {
        let isCourseFound = newRecords[index].course.findIndex(
          x => x.courseCode === courseCode
        );
        if (isCourseFound === -1) {
          let courseObj = {
            courseCode,
            handlingStaff: staffId,
            additionalStaff
          };
          newRecords[index].course.push(courseObj);
        } else {
          newRecords[index].course[isCourseFound].handlingStaff = staffId;
          newRecords[index].course[
            isCourseFound
          ].additionalStaff = additionalStaff;
        }
      }
    }
  });
  return newRecords;
};

module.exports = csvTextToRecords;
