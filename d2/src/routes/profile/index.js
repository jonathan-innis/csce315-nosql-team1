const express = require('express');
const path = require('path');
let router = express.Router();

const {favorite} = require('./favorite')

router.post('/favorite', favorite)

router.get('/testauth', (req, res) =>
    res.sendFile(path.resolve('public/testauth.html'))
)

module.exports = router;