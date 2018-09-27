const express = require('express');
const path = require('path');
let router = express.Router();

const dbServiceRoutes = require('./dbservice');
const present = require('./present')
const profile = require('./profile')

router.use('/dbservice', dbServiceRoutes);

router.use('/present', present);

router.use('/profile', profile);
//THESE ARE EXTREMEMLY UNSAFE WAYS OF SENDING FILES MOVE THIS TO NGINX WHEN ITS FOR REAL GUYS
//IM NOT JOKING THIS MAY LOOSE US POINTS FOR STUPIDITY
router.get(/\/[A-Za-z_0-9]+\.(js)/g, (req, res) =>
    res.sendFile(path.resolve('dist' + req.url))
)

router.get(/\/[A-Za-z_0-9]+\.(ico)/g, (req, res) =>
    res.sendFile(path.resolve('public' + req.url))
)

router.get(/\/[A-Za-z_0-9]+\.(png|jpg)/g, function (req, res) {
    res.sendFile(path.resolve('dist' + req.url))
    res.set("Content-Type", "image/png")
})

router.get('/', (req, res) =>
    res.sendFile(path.resolve('public/home.html'))
)
/////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;