const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator/check');
const multer = require('multer');

const { accountTypes } = require('../../../models/User');
const { leaveTypes } = require('../../../models/Leave');
const addLeave = require('./addLeave');
const getLeaves = require('./getLeaves');
const acceptLeavesHOD = require('./acceptLeavesHOD');
const rejectLeavesHOD = require('./rejectLeavesHOD');
const { checkRole: permit } = require('../../utils');

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `/home/arun/code/js-projects/lms/uploads/`);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.STAFF),
  upload.single('document'),
  [
    body('staffId')
      .exists()
      .withMessage('Staff ID cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Staff ID cannot be empty')
      .isLength({ min: 1 })
      .withMessage('Staff ID must be atleast 1 character long')
      .isNumeric()
      .withMessage('Staff ID can only contain numbers'),
    body('leaveType')
      .exists()
      .withMessage('Leave type cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Leave type cannot be empty')
      .isIn(Object.values(leaveTypes))
      .withMessage('Invalid Leave type'),
    body('noOfDays')
      .exists()
      .withMessage('No. of days cannot be empty')
      .not()
      .isEmpty()
      .withMessage('No. of days cannot be empty')
      .isNumeric()
      .withMessage('No. of days can only contain numbers'),
    body('reason')
      .exists()
      .withMessage('Reason cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Reason cannot be empty'),
    body('isVacation')
      .exists()
      .withMessage('Is Vacation cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Is Vacation cannot be empty')
      .isBoolean()
      .withMessage('Invalid value')
    /* body('address')
      .optional({ nullable: true,  })
      .exists()
      .withMessage('Address cannot be empty')
      .not()
      .isEmpty()
      .withMessage('Address cannot be empty') */
  ],
  addLeave
);

router.get(
  '/get-leaves',
  passport.authenticate('jwt', { session: false }),
  getLeaves
);

router.post(
  '/accept-hod',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  acceptLeavesHOD
);

router.post(
  '/reject-hod',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  rejectLeavesHOD
);

module.exports = router;
