const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const { body, validationResult } = require('express-validator/check');
const {
  sendPasswordChangedMail,
  sendPasswordResetMail
} = require('../../utils/email');
const crypto = require('crypto');
let parser = require('ua-parser-js');
//const errorFormatter = require('../../utils');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateActivateInput = require('../../validation/activate');
const validateAddAccountInput = require('../../validation/addaccount');
const validateResetMailInput = require('../../validation/sendResetMail');
const validateResetPasswordInput = require('../../validation/resetPassword');

//load user model
const User = require('../../models/User');
const { accountTypes, staffTypes } = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET   api/users/getclientdetails
// @desc    Login user / return JWT
// @access  Public
router.get('/getclientdetails', (req, res) => {
  let ua = parser(req.headers['user-agent']);
  return res.json({
    browser: ua.browser.name,
    browserVersion: ua.browser.version,
    os: ua.os.name,
    osVersion: ua.os.version,
    ip:
      (req.headers['x-forwarded-for'] || '').split(',').pop() ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null)
  });
});

// @route   POST   api/users/set-login-attemps
// @desc    Adds success/failure login attemps to user
// @access  Public
router.post('/set-login-attempts', (req, res) => {
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
          delete req.body.email;
          profile.prevLogins.push(req.body);
          profile.save();
          return res.json(profile);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// @route   POST   api/users/reset-password-request
// @desc    Adds password reset token with 30 mins expiry and sends email to the user
// @access  Public
router.post('/reset-password-request', (req, res) => {
  const { errors, isValid } = validateResetMailInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  User.findOne({ email })
    .then(user => {
      if (user) {
        let token = crypto.randomBytes(128).toString('hex');
        let hash = crypto
          .createHash('sha256')
          .update(token)
          .digest('hex');
        if (
          user.resetPasswordToken === '' ||
          user.resetPasswordExpires < Date.now()
        ) {
          user.set({
            resetPasswordToken: hash,
            resetPasswordExpires: Date.now() + 30 * 60 * 1000
          });
        } else {
          user.set({
            resetPasswordToken: hash
          });
        }
        user.save().then(user => {
          sendPasswordResetMail(email, token);
          return res.json({ msg: 'Password reset mail sent to ' + email });
        }) /* .catch(err => {
          return res.json({ msg: 'Password reset mail sent to ' + email });
        }); */;
      } else {
        return res.json({ msg: 'Password reset mail sent to ' + email });
      }
    })
    .catch(err => console.log(err));
});

// @route   GET   api/users/get-pwd-reset-time
// @desc    Returns the last password reset time (UNIX) from user account
// @access  Public
router.get('/get-pwd-reset-time', (req, res) => {
  User.findById(req.query.id).then(user => {
    if (!user) {
      return res.json({ pwdResetTime: -1 });
    }
    return res.json({ pwdResetTime: user.pwdResetTime });
  });
});

// @route   GET   api/users/check-reset-token
// @desc    Checks if password reset token is valid
// @access  Public
router.get('/check-reset-token', (req, res) => {
  let hash = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex');
  User.findOne({
    resetPasswordToken: hash,
    resetPasswordExpires: { $gt: Date.now() }
  }).then(user => {
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
    res.json({ status: true, user: userObj });
  });
});

// @route   POST   api/users/reset-password
// @desc    Reset password
// @access  Public - token protected
router.post('/reset-password', (req, res) => {
  const { errors, isValid } = validateResetPasswordInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let hash = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');
  User.findOne({
    staffId: req.body.staffId,
    resetPasswordToken: hash,
    resetPasswordExpires: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        errors.msg = 'Link has expired';
        return res.status(400).json(errors);
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          user.set({
            password: hash,
            resetPasswordExpires: -1,
            resetPasswordToken: '',
            pwdResetTime: Date.now()
          });
          user
            .save()
            .then(user => {
              sendPasswordChangedMail(user.email);
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    })
    .catch(err => {
      errors.msg = 'Link has expired';
      return res.status(400).json(errors);
    });
});

module.exports = router;
