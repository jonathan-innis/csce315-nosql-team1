const express = require('express');
let router = express.Router();

const {movie, topMovies, popularMovies} = require('./movie');
const person = require('./person');
const search = require('./search');

router.get('/movie', movie);
router.get('/topmovies', topMovies);
router.get('/popularmovies', popularMovies);
router.get('/person', person);
router.get('/search', search);

module.exports = router;