const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body, query } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const uploadTimetable = require('./uploadTimetable');
const addUpdateTimetable = require('./addUpdateTimetable');
const getTimetable = require('./getTimetable');
const { checkRole: permit } = require('../../utils');

router.post(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  uploadTimetable
);

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    body('classId')
      .exists()
      .withMessage('No class selected')
      .not()
      .isEmpty()
      .withMessage('No class selected')
      .custom(value => {
        let re = /^[a-fA-F0-9]{24}$/;
        if (!re.test(value)) {
          throw new Error('Invalid value');
        }
        return true;
      })
  ],
  addUpdateTimetable
);

router.get(
  '/get',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.ADMIN),
  [
    query('classId')
      .exists()
      .withMessage('No class selected')
      .not()
      .isEmpty()
      .withMessage('No class selected')
      .custom(value => {
        let re = /^[a-fA-F0-9]{24}$/;
        if (!re.test(value)) {
          throw new Error('Invalid value');
        }
        return true;
      })
  ],
  getTimetable
);

module.exports = router;
