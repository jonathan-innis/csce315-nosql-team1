const {movies, people} = require('../schemas');
const mongoose = require('mongoose');

let Movie = mongoose.model('Movie', movies, 'movies');
let People = mongoose.model('People', people, 'people');

module.exports = {Movie, People};

