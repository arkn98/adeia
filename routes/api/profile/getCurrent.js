const Profile = require('../../../models/Profile');

const getCurrent = (req, res) => {
  const errors = {};
  Profile.findOne({
    user: req.user.id
  })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No profile found';
        return res.status(404).json(errors);
      } else {
        return res.json(profile);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
};

module.exports = getCurrent;
