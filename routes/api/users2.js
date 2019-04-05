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

router.get(
  '/get-current-user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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
      .catch(err => console.log(err));
  }
);

// @route   POST  api/users/add-account
// @desc    Add admin/office accounts
// @access  Private
router.post(
  '/add-account',
  passport.authenticate('jwt', { session: false }),
  [
    body('email')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Enter a valid email address'),
    body('name')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Name cannot be empty')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password cannot be empty'),
    body('category')
      .not()
      .isEmpty()
      .withMessage('Category cannot be empty'),
    body('designation')
      .not()
      .isEmpty()
      .withMessage('Designation cannot be empty'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be atleast 8 characters long')
  ],
  (req, res) => {
    if (req.user.accountType === accountTypes.ADMIN) {
      const errors = validationResult(req).formatWith(({ msg }) => msg);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
      }
      User.findOne({ staffId: req.body.staffId, email: req.body.email })
        .then(user => {
          if (user != null && user.staffId === req.body.staffId) {
            errors.staffId = 'Staff ID already exists';
            return res.status(400).json(errors);
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              if (err) throw err;
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                const newUser = new User({
                  accountType: req.body.accountType,
                  email: req.body.email,
                  staffId: req.body.staffId,
                  name: req.body.name,
                  designation: req.body.designation,
                  category: req.body.category,
                  activated: 1,
                  password: hash,
                  staffType: req.body.staffType
                });
                newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
              });
            });
          }
        })
        .catch(err => console.log(err));
    } else {
      return res
        .status(400)
        .json({ msg: 'You do not have sufficient permissions' });
    }
  }
);

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
          errors.staffId = 'Staff already exists';
          return res.status(400).json(errors);
        } else {
          const newUser = new User({
            staffId: req.body.staffId,
            name: req.body.name,
            designation: req.body.designation,
            category: req.body.category,
            staffType: req.body.staffType
          });

          //0 -- regular teaching -- rt
          //1 -- regular non teaching -- rnt
          //2 -- teaching fellows -- tf
          //3 -- non teaching (no leave) -- nt
          //4 -- research scholars - 30 days -- rs30
          //5 -- research scholars - 20 days -- rs20
          //6 -- research scholars - others (6 days) -- rso
          //7 -- others -- oth

          //<option>Regular Teaching Staff</option>
          //<option>Regular Non-Teaching Staff</option>
          //<option>Teaching Fellows</option>
          //<option>Non-Teaching - No Leave</option>
          //<option>Research Scholars - 30</option>
          //<option>Research Scholars - 20</option>
          //<option>Research Scholars - Others</option>
          //<option>Others</option> */

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
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already in use';
        return res.status(400).json(errors);
      }
      User.findOne({ staffId: req.body.staffId })
        .then(user => {
          if (user.activated == 1) {
            errors.staffId = 'Staff account already activated';
            return res.status(400).json(errors);
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              user.set({
                activated: 1,
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        })
        .catch(err => {
          errors.staffId = 'Staff account not found';
          return res.status(400).json(errors);
        });
    })
    .catch(err => {
      errors.staffId = 'Staff account not found';
      return res.status(400).json(errors);
    });
});

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
      errors.email = 'Wrong credentials';
      errors.password = 'Wrong credentials';
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        //create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          designation: user.designation,
          staffId: user.staffId,
          accountType: user.accountType,
          staffType: user.staffType
        };

        if (user.resetPasswordToken && user.resetPasswordToken !== '') {
          user.set({ resetPasswordToken: '', resetPasswordExpires: -1 });
          user.save();
        }

        //sign the token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: '24h' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.email = 'Wrong credentials';
        errors.password = 'Wrong credentials';
        return res.status(400).json(errors);
      }
    });
  });
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

// @route   PUT   api/users/clear-reset-token
// @desc    Removes token from user account
// @access  Public - token protected
router.put('/clear-reset-token', (req, res) => {
  User.findOne({
    staffId: req.body.staffId
  })
    .then(user => {
      if (user) {
        user.set({
          resetPasswordExpires: -1,
          resetPasswordToken: ''
        });
        user
          .save()
          .then(res => res.json({ msg: 'Clear token success' }))
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      return res.status(400).json(err);
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
