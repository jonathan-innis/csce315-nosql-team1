const express = require('express');
const path = require('path');
let router = express.Router();

var bodyParser = require('body-parser');  
var jsonParser = bodyParser.json()  

const {favoriteMovie, favoritePerson, getProfile, unfavoriteMovie, unfavoritePerson, checkMovie, checkPerson} = require('./favorite')
const {google} = require('./google')

//router.post('/favorite', favorite)

router.post('/google', jsonParser, google)
router.post('/favoriteMovie', jsonParser, favoriteMovie)
router.post('/favoritePerson', jsonParser, favoritePerson)
router.post('/unfavoriteMovie', jsonParser, unfavoriteMovie)
router.post('/unfavoritePerson', jsonParser, unfavoritePerson)
router.post('/getProfile', jsonParser, getProfile)


router.post('/checkMovie', jsonParser, checkMovie)
router.post('/checkPerson', jsonParser, checkPerson)


module.exports = router;