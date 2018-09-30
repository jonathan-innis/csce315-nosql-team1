const express = require('express');
let router = express.Router();

const {movie, topMovies, popularMovies, autocomplete} = require('./movie');
const {person, popularActors} = require('./person');
const search = require('./search');

router.get('/movie', movie);
router.get('/topmovies', topMovies);
router.get('/popularmovies', popularMovies);
router.get('/popularactors', popularActors);
router.get('/person', person);
router.get('/search', search);
router.get('/autocomplete', autocomplete);

module.exports = router;
