const User = require('../../../models/User');
const Profile = require('../../../models/Profile');
let parser = require('ua-parser-js');
const dayjs = require('dayjs');

const setLoginAttempt = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      Profile.findOne({ staffId: user.staffId })
        .then(profile => {
          if (!profile) {
            return res.status(404).json({ msg: 'User not found' });
          }
          let ua = parser(req.headers['user-agent']);
          let loginDetails = {
            attemptStatus: req.body.attemptStatus,
            timestamp: dayjs().unix(),
            browser: ua.browser.name,
            browserVersion: ua.browser.version,
            os: ua.os.name,
            osVersion: ua.os.version,
            ip:
              (req.headers['x-forwarded-for'] || '').split(',').pop() ||
              req.connection.remoteAddress ||
              req.socket.remoteAddress ||
              (req.connection.socket
                ? req.connection.socket.remoteAddress
                : null)
          };
          let modifiedPrevLogins = profile.prevLogins;
          modifiedPrevLogins.push(loginDetails);
          modifiedPrevLogins = modifiedPrevLogins.slice(
            Math.max(modifiedPrevLogins.length - 100, 0)
          );
          profile.set({ prevLogins: modifiedPrevLogins });
          profile.save();
          return res.json(profile);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = setLoginAttempt;
