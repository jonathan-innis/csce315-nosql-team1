const {Movie} = require('../../models');
const {AutoComplete} = require('mongoose-in-memory-autocomplete');

movie = async (req, res) => {
    try{
        const {movie_id} = req.query;
        const movie = await Movie.findOne({id: movie_id});
        res.json(movie)
    }
    catch (error){
        console.log(error)
        res.sendStatus(400);
    }
}

topMovies = async (req, res) => {
    try{
        const {limit} = req.query;
        const top_movies = await Movie.find().sort({revenue: -1}).limit(parseInt(limit));
        res.json(top_movies)
    }
    catch (error){
        console.log(error)
        res.sendStatus(400);
    }
}

popularMovies = async (req, res) => {
    try{
        const {limit} = req.query;
        const top_movies = await Movie.find().sort({vote_average: -1}).limit(parseInt(limit));
        res.json(top_movies)
    }
    catch (error){
        console.log(error)
        res.sendStatus(400);
    }
}

movieAutoComplete = async (req, res) => {

    try{
        const q = req.query.q;
        var configuration = {
            autoCompleteFields : [ "title" ],
            dataFields: [
                "id", 
                "poster_path",
                "genres",
                "release_date",
                "budget",
                "runtime"
            ],
            maximumResults: 5,   
            model: Movie
        }
        
        var myMembersAutoComplete = new AutoComplete(configuration, function(){         
        });

        myMembersAutoComplete.getResults(q, function(err, words){
          if(err)
            res.json(err);
          else
            res.json(words);
        });
    }
    catch (error){
        console.log(error)
        res.sendStatus(400);
    }
}

module.exports={movie, topMovies, popularMovies, movieAutoComplete};
