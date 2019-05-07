const crypto = require('crypto');
const User = require('../../../models/User');

const getCurrent = (req, res) => {
  const id = req.query.id;
  User.findOne({ _id: id })
    .then(user => {
      if (user) {
        let token = crypto.randomBytes(64).toString('hex');
        let hash = crypto
          .createHash('sha256')
          .update(token)
          .digest('hex');
        const newUser = {};
        newUser.staffId = user.staffId;
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.staffType = user.staffType;
        newUser.designation = user.designation;
        newUser.category = user.category;
        newUser.accountType = user.accountType;
        newUser.OTToken = token;
        user.set({ OTToken: hash });
        user.save().then(() => {
          return res.status(200).json({ user: newUser });
        });
      } else {
        return res.status(404).json({ msg: 'User not found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = getCurrent;
