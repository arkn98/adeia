const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body, query } = require('express-validator/check');

const { accountTypes } = require('../../../models/User');
const uploadTimetable = require('./uploadTimetable');
const addUpdateTimetable = require('./addUpdateTimetable');
const getTimetable = require('./getTimetable');
const getSlotsToAlternate = require('./getSlotsToAlternate');
const getFreeSlots = require('./getFreeSlots');
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
  permit(accountTypes.ADMIN, accountTypes.STAFF),
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

router.post(
  '/get-slots-to-alternate',
  passport.authenticate('jwt', { session: false }),
  permit(accountTypes.STAFF),
  /* [
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
  ], */
  getSlotsToAlternate
);

router.post(
  '/get-free-slots',
  passport.authenticate('jwt', { session: false }),
  /* [
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
  ], */
  getFreeSlots
);

module.exports = router;
