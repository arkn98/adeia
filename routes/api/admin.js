const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load model
const Class = require('../../models/Class');
const User = require('../../models/User');

//load input validation
const validateAddClassInput = require('../../validation/addClass');

// @route   GET   api/admin/test
// @desc    Tests admin route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Admin works' }));

// @route   POST   api/admin/class/add
// @desc    Tests admin route
// @access  Private
router.post(
  '/class/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const { errors, isValid } = validateAddClassInput(req.body);
      //check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Class.findOne({ code: req.body.code }).then(classs => {
        if (classs) {
          classs.set({ name: req.body.name });
          classs
            .save()
            .then(classs => res.json(classs))
            .catch(err => console.log(err));
        } else {
          const newClass = new Class({
            name: req.body.name,
            code: req.body.code
          });
          newClass
            .save()
            .then(classs => res.json(classs))
            .catch(err => console.log(err));
        }
      });
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

module.exports = router;
