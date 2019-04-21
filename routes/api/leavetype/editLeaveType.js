const { validationResult } = require('express-validator/check');
const LeaveType = require('../../../models/LeaveType');

const editLeaveType = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  LeaveType.findOne({ leaveType: req.body.leaveTypeSelect }).then(
    leaveTypeItem => {
      if (!leaveTypeItem) {
        errors.leaveTypeSelect = 'Leave type does not exist';
        return res.status(400).json(errors);
      }
      leaveTypeItem.set({
        noOfDays: req.body.noOfDaysUpdate
      });
      leaveTypeItem
        .save()
        .then(result => res.status(200).json('success'))
        .catch(err => console.log(err));
    }
  );
};

module.exports = editLeaveType;
