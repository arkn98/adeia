const User = require('../../../models/User');

const getCurrent = (req, res) => {
  const id = req.query.id;
  User.findOne({ _id: id })
    .then(user => {
      if (user) {
        const newUser = {};
        newUser.staffId = user.staffId;
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.staffType = user.staffType;
        newUser.designation = user.designation;
        newUser.category = user.category;
        newUser.accountType = user.accountType;
        return res.status(200).json({ user: newUser });
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
