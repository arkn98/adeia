const Profile = require('../../../models/Profile');

const getCurrent = (req, res) => {
  const errors = {};
  Profile.findOne({
    user: req.user._id
  })
    .populate({
      path: 'leaveAllocation',
      populate: { path: 'leaveTypesAllowed' }
    })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No profile found';
        return res.status(404).json(errors);
      } else {
        return res.status(200).json(profile);
        /* return res.json({
          ...profile,
          notifications: profile.notifications.slice(0, 20)
        }); */
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
};

module.exports = getCurrent;
