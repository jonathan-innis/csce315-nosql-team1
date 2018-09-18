const express = require('express');
let router = express.Router();

const dbServiceRoutes = require('./dbservice');

router.use('/dbservice', dbServiceRoutes);

module.exports = router;