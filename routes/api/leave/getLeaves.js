const Leave = require('../../../models/Leave');
const { accountTypes } = require('../../../models/User');

const getLeaves = (req, res) => {
  if (
    [accountTypes.ADMIN, accountTypes.OFFICE].includes(req.user.accountType)
  ) {
    Leave.find({})
      .then(result => res.status(200).json(result))
      .catch(err => res.status(404).json(err));
  } else {
    Leave.find({ staffId: req.user.staffId })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(404).json(err));
  }
};

module.exports = getLeaves;
