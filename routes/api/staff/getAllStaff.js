const { accountTypes } = require('../../../models/User');
const User = require('../../../models/User');

const getAllStaff = (req, res) => {
  User.find({ accountType: accountTypes.STAFF })
    .sort({ staffId: 1 })
    .lean()
    .then(users => {
      if (!users) {
        errors.msg = 'No staff found';
        return res.status(404).json();
      } else {
        let newUsers = users.map((item, index) => {
          return {
            _id: item._id,
            staffId: item.staffId,
            name: item.name,
            designation: item.designation,
            category: item.category,
            email: item.email,
            staffType: item.staffType,
            accountType: item.accountType
          };
        });
        res.json(newUsers);
      }
    })
    .catch(err => res.status(404).json(err));
};

module.exports = getAllStaff;
