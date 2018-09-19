const Movie = require('./MovieSchema');
const People = require('./PeopleSchema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    'movies': new Schema(Movie),
    //'people': new Schema(People)
}