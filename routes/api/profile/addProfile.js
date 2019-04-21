const { validationResult } = require('express-validator/check');
const User = require('../../../models/User');
const Profile = require('../../../models/Profile');
const LeaveAllocation = require('../../../models/LeaveAllocation');

const addProfile = (req, res) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  User.findOne({ staffId: req.body.staffId })
    .then(user => {
      if (user) {
        //0 - dummy category
        //1 - casual leave - 12
        //2 - compensation leave - 365
        //3 - earn leave - 365
        //4 - medical leave - 365
        //5 - on duty - 365
        //6 - restricted holiday - 3
        //7 - special casual leave - 15
        //8 - casual leave - 30 days - 30
        //9 - casual leave - 20 days - 20
        //10- casual leave - 6 days - 6

        //leave type
        //1 -- Casual Leave -- cl
        //2 -- Compensation Leave -- cpl
        //3 -- Earn Leave -- el
        //4 -- Medical Leave -- ml
        //5 -- On Duty -- od
        //6 -- Restricted Holiday -- rh
        //7 -- Special Casual Leave -- scl
        //8 -- Casual Leave - 30 Days -- cl30
        //9 -- Casual Leave - 20 Days -- cl20
        //10 - Casual Leave - 6 Days -- cl6

        /* leaveAllotted = {
          'cl': 12,
          'cpl': 365,
          'el': 365,
          'ml': 365,
          'od': 365,
          'rh': 3,
          'scl': 15,
          'cl30': 30,
          'cl20': 20,
          'cl6': 6
        } */

        //staff type
        //0 -- regular teaching -- rt -- cl, cpl, el, ml, od, rh, scl
        //1 -- regular non teaching -- rnt -- cl, cpl, el, ml, od, rh, scl
        //2 -- teaching fellows -- tf -- cpl, od, cl6
        //3 -- non teaching (no leave) -- nt -- cpl
        //4 -- research scholars - 30 days -- rs30 -- od, cl30
        //5 -- research scholars - 20 days -- rs20 -- od, cl20
        //6 -- research scholars - others (6 days) -- rso -- od, cl30
        //7 -- others -- oth
        LeaveAllocation.findOne({ staffType: user.staffType })
          .populate('leaveTypesAllowed')
          .then(allocation => {
            if (allocation) {
              let leaveAvailed = allocation.leaveTypesAllowed.map(
                leaveTypes => {
                  return {
                    leaveType: leaveTypes.leaveType,
                    noOfDays: 0
                  };
                }
              );
              let profileFields = new Profile({
                user: user.id,
                staffId: user.staffId,
                leaveAllocation: allocation._id,
                leaveAvailed
              });
              profileFields
                .save()
                .then(profile => res.status(200).json('success'))
                .catch(err => {
                  console.log(err);
                  res.status(400).json(err);
                });
            }
          });
      } else {
        errors.msg = 'Staff not found';
        res.status(404).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
};

module.exports = addProfile;
