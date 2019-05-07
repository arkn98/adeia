const Alteration = require('../../../models/Alteration');
const { accountTypes } = require('../../../models/User');

const getAlterations = (req, res) => {
  if (
    [accountTypes.ADMIN, accountTypes.OFFICE].includes(req.user.accountType)
  ) {
    Alteration.find({})
      .populate({ path: 'originalStaff', select: 'staffId name email' })
      .populate({ path: 'alternatingStaff', select: 'staffId name email' })
      .populate({ path: 'class' })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(404).json(err));
  } else {
    Alteration.find({ alternatingStaff: req.user._id })
      .populate({ path: 'originalStaff', select: 'staffId name email' })
      .populate({ path: 'alternatingStaff', select: 'staffId name email' })
      .populate({ path: 'class' })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => res.status(404).json(err));
  }
};

module.exports = getAlterations;
