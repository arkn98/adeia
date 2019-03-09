const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load model
const Class = require('../../models/Class');
const User = require('../../models/User');
const Timetable = require('../../models/TestTimetable');

module.exports = router;
