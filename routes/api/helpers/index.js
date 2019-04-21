const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//check status of db
router.get('/check-db', (req, res) =>
  res.json({ status: mongoose.connection.readyState === 1 ? true : false })
);

module.exports = router;
