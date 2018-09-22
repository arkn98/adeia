const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load user model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET   api/profile
// @desc    Get current user's profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'No profile found';
          return res.status(404).json();
        } else res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', (req, res) => {
  let errors = {};
  // Get fields
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

        //staff type
        //0 -- regular teaching -- rt -- cl, cpl, el, ml, od, rh, scl
        //1 -- regular non teaching -- rnt -- cl, cpl, el, ml, od, rh, scl
        //2 -- teaching fellows -- tf -- cpl, od, cl6
        //3 -- non teaching (no leave) -- nt -- cpl
        //4 -- research scholars - 30 days -- rs30 -- od, cl30
        //5 -- research scholars - 20 days -- rs20 -- od, cl20
        //6 -- research scholars - others (6 days) -- rso -- od, cl30
        //7 -- others -- oth
        let leaveAllowed, noOfDays;
        let leaveAllotted = {};
        let leaveAvailable = {};
        if (user.staffType === 'rt') {
          leaveAllowed = [0, 1, 2, 3, 4, 5, 6, 7];
          noOfDays = [0, 12, 365, 365, 365, 365, 3, 15];
        } else if (user.staffType === 'rnt') {
          leaveAllowed = [0, 1, 2, 3, 4, 5, 6, 7];
          noOfDays = [0, 12, 365, 365, 365, 365, 3, 15];
        } else if (user.staffType === 'tf') {
          leaveAllowed = [0, 2, 5, 10];
          noOfDays = [0, 365, 365, 6];
        } else if (user.staffType === 'nt') {
          leaveAllowed = [0, 2];
          noOfDays = [0, 365];
        } else if (user.staffType === 'rs30') {
          leaveAllowed = [0, 5, 8];
          noOfDays = [0, 365, 30];
        } else if (user.staffType === 'rs20') {
          leaveAllowed = [0, 5, 9];
          noOfDays = [0, 365, 20];
        } else if (user.staffType === 'rso') {
          leaveAllowed = [0, 5, 8];
          noOfDays = [0, 365, 6];
        } else if (user.staffType === 'oth') {
          leaveAllowed = [0];
          noOfDays = [0];
        }

        leaveAllotted.leaveAllowed = leaveAllowed;
        leaveAllotted.noOfDays = noOfDays;

        let profileFields = new Profile({
          user: user.id,
          prevLogins: req.body.prevLogins,
          cplCredits: req.body.cplCredits,
          leaveAllotted,
          leaveAvailable: leaveAllotted
        });
        profileFields
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(400).json(err));
      } else {
        errors.msg = 'Staff not found';
        res.status(404).json(errors);
      }
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET   api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile works' }));

module.exports = router;
