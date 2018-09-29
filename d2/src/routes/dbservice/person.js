const {People} = require('../../models');
const {Movie}  = require('../../models');

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


module.exports = {popularActors, person};