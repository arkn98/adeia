const crypto = require('crypto');

const User = require('../../../models/User');

const checkResetToken = (req, res) => {
  let token = '';
  if (typeof req.query.token !== 'undefined') {
    token = req.query.token;
  }
  let hash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  User.findOne({
    resetPasswordToken: hash,
    resetPasswordExpires: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        return res.json({ status: false });
      }
      let userObj = {};
      userObj.name = user.name;
      let tempPos = user.email.search('@');
      tempPos = tempPos - 1;
      let xString = '';
      for (let i = 1; i < tempPos; i++) {
        xString += 'x';
      }
      userObj.email =
        user.email.charAt(0) + xString + user.email.substring(tempPos);
      userObj.staffId = user.staffId;
      res.status(200).json({ status: true, user: userObj });
    })
    .catch(err => res.status(200).json({ status: false }));
};

module.exports = checkResetToken;
