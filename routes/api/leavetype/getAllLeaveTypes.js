const LeaveType = require('../../../models/LeaveType');

const getAllLeaveTypes = (req, res) => {
  LeaveType.find({})
    .lean()
    .then(leaveTypes => {
      if (!leaveTypes) {
        errors.msg = 'No leave type found';
        return res.status(404).json(errors);
      } else {
        res.json(leaveTypes);
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
};

module.exports = getAllLeaveTypes;
