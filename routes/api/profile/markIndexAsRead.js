const Profile = require('../../../models/Profile');

const markIndexAsRead = (req, res) => {
  const notificationId = req.query.id;
  Profile.findOne({ user: req.user._id })
    .then(profile => {
      if (profile) {
        let notificationsCopy = profile.notifications.slice(0);
        let index = notificationsCopy.findIndex(
          x => x.notificationId === notificationId
        );
        notificationsCopy[index] = {
          ...notificationsCopy[index],
          isNew: false
        };
        profile.set({ notifications: notificationsCopy });
        profile.save().then(() => {
          return res.status(200).json('success');
        });
      }
    })
    .catch(err => console.log(err));
};

module.exports = markIndexAsRead;
