const express = require("express");
const router = express.Router();

router.use('/api/v1/users', require('./users'));

router.use('/api/v1/card', require('./cards'));

router.use('/auth/v1', require('./auth'));

router.use('/services/v1', require('./services'));

module.exports = router;