const {Movie, People} = require('../../models');

async function convertIdToMovie(_id) {
    return await Movie.findById(_id);
}

module.exports = async (req, res) => {
    try{
        const {q, num} = req.query;
        movies = [];
        people = [];

        movies = await Movie.find({title: { $regex: `(?i).*${q}.*` }});
        people = await People.find({name: { $regex: `(?i).*${q}.*` }});

        if (people.length > 0){
            for (let i in people){
                const {crew_in, cast_in, name} = people[i];
                let crewInMovies = [];
                let castInMovies = [];

                for (let movie of crew_in){
                    crewInMovies.push(movie);
                }
                for (let movie of cast_in){
                    castInMovies.push(movie);
                }
                people[i]['crew_in'] = crewInMovies;
                people[i]['cast_in'] = castInMovies;
            }
        }
        
        if (num) res.json({movies: movies.slice(0, parseInt(num)), people: people.slice(0, parseInt(num))})
        else res.json({movies: movies, people: people});
    }
    catch(error){
        console.log(error)
        res.sendStatus(400);
    }
}