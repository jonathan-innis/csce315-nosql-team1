const {Movie} = require('../../models');

module.exports = async (req, res) => {
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
