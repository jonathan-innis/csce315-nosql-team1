const {movies} = require('../schemas');
const mongoose = require('mongoose');

movies.statics.search = async function search(query){
  
    return await this.model('Movie', movies, 'movies').find( { $text : { $search : query} } );
}

let Movie = mongoose.model('Movie', movies, 'movies');

module.exports = Movie;
