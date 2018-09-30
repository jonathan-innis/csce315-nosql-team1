const Movie = require('./MovieSchema');
const People = require('./PeopleSchema');
const Profiles = require('./ProfileSchema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    'movies': new Schema(Movie),
    'people': new Schema(People),
    'profiles' : new Schema(Profiles)
}