const {Movie} = require('../../models');

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

module.exports={movie, topMovies};