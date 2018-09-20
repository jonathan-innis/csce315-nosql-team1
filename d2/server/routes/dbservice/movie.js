const {Movie} = require('../../models');

module.exports = async (req, res) => {
    try{
        const {movie_id} = req.query;
        movies = await Movie.findOne({id: movie_id});
        res.json({movies: movies})
    }
    catch (error){
        res.sendStatus(400);
    }
}
