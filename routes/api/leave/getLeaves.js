const Leave = require('../../../models/Leave');
const { accountTypes } = require('../../../models/User');

const getLeaves = (req, res) => {
  let { query = {} } = req.query;
  query = JSON.parse(query);
  if (
    [accountTypes.ADMIN, accountTypes.OFFICE].includes(req.user.accountType)
  ) {
    Leave.find({ ...query })
      .populate({ path: 'staff', select: 'name staffId staffType' })
      .populate({
        path: 'alterations',
        populate: { path: 'class' }
      })
      .populate({
        path: 'alterations',
        populate: { path: 'originalStaff' }
      })
      .populate({
        path: 'alterations',
        populate: { path: 'alternatingStaff' }
      })
      .then(result => res.status(200).json(result))
      .catch(err => {
        console.log(err);
        return res.status(404).json(err);
      });
  } else {
    Leave.find({ staff: req.user._id, ...query })
      .populate({ path: 'staff', select: 'name staffId staffType' })
      .populate({
        path: 'alterations',
        populate: { path: 'class' }
      })
      .populate({
        path: 'alterations',
        populate: { path: 'originalStaff' }
      })
      .populate({
        path: 'alterations',
        populate: { path: 'alternatingStaff' }
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => res.status(404).json(err));
  }
};

module.exports = getLeaves;
