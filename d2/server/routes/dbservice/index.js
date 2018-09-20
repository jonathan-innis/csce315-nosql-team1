const express = require('express');
let router = express.Router();

const movie = require('./movie');
const person = require('./person');
const search = require('./search');

router.get('/movie', movie);
router.get('/person', person);
router.get('/search', search);
router.get(/\/[A-Za-z_0-9]+\.[a-z]+/g, (req, res) =>
    console.log(req.url)//require('../../dist' + req.originalUrl)
)
router.get('/', (req, res) =>
    require("../../home.html")
)

module.exports = router;