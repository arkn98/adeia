const { validationResult } = require('express-validator/check');
const LeaveAllocation = require('../../../models/LeaveAllocation');
const LeaveType = require('../../../models/LeaveType');

const editLeaveAllocation = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  LeaveAllocation.findOne({
    staffType: req.body.staffTypeSelect.toUpperCase()
  }).then(leaveAllocObj => {
    if (!leaveAllocObj) {
      LeaveType.find({}).then(leaveTypes => {
        if (leaveTypes) {
          let leaveTypeIds = [];
          req.body.leaveTypesAllowedUpdate.forEach(element => {
            let tempIndex = leaveTypes.findIndex(x => x.leaveType === element);
            if (tempIndex !== -1) {
              leaveTypeIds.push(leaveTypes[tempIndex]._id);
            }
          });

          const newObj = new LeaveAllocation({
            staffType: req.body.staffTypeSelect,
            leaveTypesAllowed: leaveTypeIds
          });
          newObj
            .save()
            .then(result => res.status(200).json('success'))
            .catch(err => console.log(err));
        }
      });
    } else {
      LeaveType.find({}).then(leaveTypes => {
        if (leaveTypes) {
          let leaveTypeIds = [];
          req.body.leaveTypesAllowedUpdate.forEach(element => {
            let tempIndex = leaveTypes.findIndex(x => x.leaveType === element);
            if (tempIndex !== -1) {
              leaveTypeIds.push(leaveTypes[tempIndex]._id);
            }
          });

          leaveAllocObj.set({ leaveTypesAllowed: leaveTypeIds });
          leaveAllocObj
            .save()
            .then(result => res.status(200).json('success'))
            .catch(err => console.log(err));
        }
      });
    }
  });
};

module.exports = editLeaveAllocation;
