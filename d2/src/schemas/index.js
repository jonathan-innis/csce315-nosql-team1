const Movie = require('./MovieSchema');
const People = require('./PeopleSchema');
const Profiles = require('./ProfileSchema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movie = new Schema(Movie);
movie.index( { title: "text", "belongs_to_collection.name": "text" } );
var people = new Schema(People);
people.index( ( { name: "text" } ) );

module.exports = {
    'movies': movie,
    'people': people,
    'profiles' : new Schema(Profiles)
}

