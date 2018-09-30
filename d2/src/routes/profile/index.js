const express = require('express');
const path = require('path');
let router = express.Router();

var bodyParser = require('body-parser');  
var jsonParser = bodyParser.json()  

const {favoriteMovie, favoritePerson, getProfile} = require('./favorite')
const {google} = require('./google')

//router.post('/favorite', favorite)

router.post('/google', jsonParser, google)
router.post('/favoriteMovie', jsonParser, favoriteMovie)
router.post('/favoritePerson', jsonParser, favoritePerson)
router.post('/getProfile', jsonParser, getProfile)


router.post('/checkMovie', jsonParse, getProfile)
router.post('/checkPerson', jsonParse, getProfile)


module.exports = router;