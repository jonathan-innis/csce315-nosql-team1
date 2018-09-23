const {Movie, People} = require('../../models');

module.exports = async (req, res) => {
    try{
        const {q, num} = req.query;
        movies = [];
        people = [];

        movies = await Movie.search(q);
        people = await People.search(q);
        
        if (num) res.json({movies: movies.slice(0, parseInt(num)), people: people.slice(0, parseInt(num))})
        else res.json({movies: movies, people: people});
    }
    catch(error){
        console.log(error)
        res.sendStatus(400);
    }
}