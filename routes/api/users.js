const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateActivateInput = require('../../validation/activate');

//load user model
const User = require('../../models/User');

// @route   GET   api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

// @route   POST  api/users/add-admin
// @desc    Add admin
// @access  Public
router.post('/add-admin', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        staffId: req.body.staffId,
        name: req.body.name,
        designation: req.body.designation,
        category: req.body.category,
        accountType: 0,
        activated: 1
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST   api/users/register
// @desc    Register staff
// @access  Private
router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.accountType === 0) {
      const { errors, isValid } = validateRegisterInput(req.body);
      //check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      User.findOne({ staffId: req.body.staffId }).then(user => {
        if (user) {
          errors.staffId = 'Staff ID already exists';
          return res.status(400).json(errors);
        } else {
          const newUser = new User({
            staffId: req.body.staffId,
            name: req.body.name,
            designation: req.body.designation,
            category: req.body.category
          });
          newUser
            .save()
            .then(user => res.json(user))
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

// @route   POST   api/users/activate
// @desc    Activate staff account
// @access  Public
router.post('/activate', (req, res) => {
  const { errors, isValid } = validateActivateInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ staffId: req.body.staffId })
    .then(user => {
      if (user.activated == 1) {
        errors.staffId = 'Staff account already activated';
        return res.status(400).json(errors);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            user.set({ activated: 1, email: req.body.email, password: hash });
            user
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => {
      errors.staffId = 'No Staff account found';
      return res.status(400).json(errors);
    });
});

// @route   POST   api/users/login
// @desc    Login user / return JWT
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        //create jwt payload
        const payload = {
          id: user.id,
          staffId: user.staffId,
          accountType: user.accountType
        };
        //sign the token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '1h' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET   api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      staffId: req.user.staffId,
      name: req.user.name,
      email: req.user.email,
      designation: req.user.designation,
      category: req.user.category
    });
  }
);

module.exports = router;
