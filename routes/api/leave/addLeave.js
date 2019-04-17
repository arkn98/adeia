const { validationResult } = require('express-validator/check');
const shortid = require('shortid');
const Leave = require('../../../models/Leave');

const addLeave = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  const leave = new Leave({
    leaveId: shortid.generate(),
    staffId: req.body.staffId,
    applyDate: new Date(),
    from: req.body.from,
    to: req.body.to,
    leaveType: req.body.leaveType,
    noOfDays: req.body.noOfDays,
    reason: req.body.reason,
    isVacation: req.body.isVacation,
    address: req.body.address
  });

  leave
    .save()
    .then(data => res.status(200).json({ leaveId: data.leaveId }))
    .catch(err => console.log(err));
};

module.exports = addLeave;
