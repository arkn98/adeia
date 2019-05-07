const Profile = require('../../../models/Profile');

const markAllAsRead = (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    if (profile) {
      let notificationsCopy = profile.notifications;
      notificationsCopy = notificationsCopy.map(x => ({ ...x, isNew: false }));
      profile.set({ notifications: notificationsCopy });
      profile.save().then(() => {
        return res.status(200).json('success');
      });
    }
  });
};

module.exports = markAllAsRead;
