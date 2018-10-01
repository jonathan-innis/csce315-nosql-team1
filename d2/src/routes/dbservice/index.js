const express = require('express');
let router = express.Router();

const {movie, topMovies, popularMovies, movieAutoComplete} = require('./movie');
const {person, popularActors, personAutoComplete} = require('./person');
const search = require('./search');

router.get('/movie', movie);
router.get('/topmovies', topMovies);
router.get('/popularmovies', popularMovies);
router.get('/popularactors', popularActors);
router.get('/person', person);
router.get('/search', search);
router.get('/movieautocomplete', movieAutoComplete);
router.get('/personautocomplete', personAutoComplete);

module.exports = router;
