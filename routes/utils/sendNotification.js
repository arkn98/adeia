const Profile = require('../../models/Profile');

const sendNotification = data => {
  return new Promise((resolve, reject) => {
    Profile.findOne({ user: data.user }).then(profile => {
      if (!profile) {
        reject();
      } else {
        let notificationsCopy = profile.notifications.map(item => item);
        notificationsCopy.push(data.data);
        profile.set({ notifications: notificationsCopy });
        profile.save().then(() => {
          sendSocketNotification(`notifications:${profile.user}`, data.data);
          resolve();
        });
      }
    });
  });
};

const sendSocketNotification = (roomId, data) => {
  let io = require('../sockets').io();
  io.in(roomId).emit('newNotification', data);
};

module.exports = sendNotification;
