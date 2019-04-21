const LeaveAllocation = require('../../../models/LeaveAllocation');

const getAllLeaveAllocations = (req, res) => {
  LeaveAllocation.find({})
    .populate('leaveTypesAllowed')
    .then(leaveAllocations => {
      if (!leaveAllocations) {
        errors.msg = 'No leave allocation found';
        return res.status(404).json(errors);
      } else {
        res.json(leaveAllocations);
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
};

module.exports = getAllLeaveAllocations;
