const {movies} = require('../schemas');
const mongoose = require('mongoose');

movies.statics.search = async function search(query){
    return await this.model('Movie', movies, 'movies').find({title: { $regex: `(?i)^${query}.*` }});
}

// movies.statics.autocomplete = async function autocomplete(query){
//     return await this.model('Movie', movies, 'movies').find( { $text: { $search: query } } ).limit(5);
// }

let Movie = mongoose.model('Movie', movies, 'movies');

// Movie.ensureIndexes( { "title": "text", "belongs_to_collection.name": "text" } );

module.exports = Movie;
