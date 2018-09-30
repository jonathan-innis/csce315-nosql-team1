const {Movie} = require('../../models');
const {AutoComplete} = require('mongoose-in-memory-autocomplete')


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

autocomplete = async (req, res) => {
    try{
        const q = req.query.q;

        // const movie = await Movie.autocomplete(q);
        // Autocomplete configuration
        var configuration = {
            //Fields being autocompleted, they will be concatenated
            autoCompleteFields : [ "title", "belongs_to_collection.name"],
            //Returned data with autocompleted results
            dataFields: ["id", "title"],
            //Maximum number of results to return with an autocomplete request
            maximumResults: 5,
            //MongoDB model (defined earlier) that will be used for autoCompleteFields and dataFields
            model: Movie
        }

        //initialization of AutoComplete Module
        var myMembersAutoComplete = new AutoComplete(configuration, function(){
          //any calls required after the initialization
          console.log("Loaded " + myMembersAutoComplete.getCacheSize() + " words in auto complete");
        });

        // //Finding in the autocomplete
        // //
        // // Lets say we have in mongodb a document -> { firstName : "James", lastName: "Green", _id: "535f06a28ddfa3880f000003"}
        // // getResults will return words -> [{"word": "James Green","data": ["535f06a28ddfa3880f000003"]}]
        // //
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

module.exports={movie, topMovies, popularMovies, autocomplete};
