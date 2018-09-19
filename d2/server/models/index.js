const {movies, people} = require('../schemas');
const mongoose = require('mongoose');

let Movie = mongoose.model('Movie', movies);
let People = mongoose.model('People', people);

module.exports = {Movie, People};

