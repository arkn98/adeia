const { validationResult } = require('express-validator/check');
const LeaveType = require('../../../models/LeaveType');

const addLeaveType = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  LeaveType.findOne({ leaveType: req.body.leaveType })
    .then(leaveType => {
      if (leaveType) {
        errors.leaveType = 'Leave type already exists';
        return res.status(400).json(errors);
      } else {
        const leaveObj = new LeaveType({
          leaveType: req.body.leaveType,
          noOfDays: req.body.noOfDays
        });
        leaveObj
          .save()
          .then(data => res.status(200).json('success'))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err);
    });
};

module.exports = addLeaveType;
