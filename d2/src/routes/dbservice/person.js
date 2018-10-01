const {People} = require('../../models');
const {Movie}  = require('../../models');
const {AutoComplete} = require('mongoose-in-memory-autocomplete');

convertMovieIdToMovie = async function(movie_id){
    return await Movie.findById(movie_id).select('id title poster_path release_date genres popularity');
}

person = async (req, res) => {
    try{
        const {person_id} = req.query;
        let crew_in_movies = [];
        let cast_in_movies = [];

        let person = await People.findOne({id: person_id});
        let {crew_in, cast_in} = person;
        for (let crew of crew_in){
            let movie = await convertMovieIdToMovie(crew._id);
            crew_in_movies.push({'job': crew.job, 'movie': movie});
        }
        for (let cast of cast_in){
            let movie = await convertMovieIdToMovie(cast._id);
            cast_in_movies.push({'character': cast.character, 'movie': movie});
        }

        person['crew_in'] = crew_in_movies;
        person['cast_in'] = cast_in_movies;
        res.json(person)
    }
    catch(error){
        console.log(error)
        res.sendStatus(400);
    }
}

popularActors = async(req, res) => {
    try{
        const {limit} = req.query;
        let actors = []
        const top_actors = await People.aggregate([{$unwind: "$cast_in"}, { $group : { _id : "$_id", len : { $sum : 1 } } }]).sort({len: -1}).limit(parseInt(limit));
        for (let {_id} of top_actors){
            const actor = await People.findById(_id);
            actors.push(actor);
        }
        res.json(actors);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

personAutoComplete = async (req, res) => {

    try{
        const q = req.query.q;

        // const movie = await Movie.autocomplete(q);
        // Autocomplete configuration
        var configuration = {
            //Fields being autocompleted, they will be concatenated
            autoCompleteFields : [ "name"],
            //Returned data with autocompleted results
            dataFields: ["id"],
            //Maximum number of results to return with an autocomplete request
            maximumResults: 5,
            //MongoDB model (defined earlier) that will be used for autoCompleteFields and dataFields
            model: People
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


module.exports = {popularActors, person, personAutoComplete};
