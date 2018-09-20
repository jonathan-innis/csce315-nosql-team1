const {People} = require('../../models');
const {Movie}  = require('../../models');

async function convertIdToMovie(_id) {
    return await Movie.findById(_id);
}

module.exports = async (req, res) => {
    try{
        const {person_id} = req.query;
        people = [];

        people = await People.find({id: person_id});

        if (people.length > 0){
            for (let i in people){
                const {crew_in, cast_in} = people[i];
                let crewInMovies = [];
                let castInMovies = [];

                for (let movieId of crew_in){
                    const movie = await convertIdToMovie(movieId);
                    crewInMovies.push(movie);
                }
                for (let movieId of cast_in){
                    const movie = await convertIdToMovie(movieId);
                    castInMovies.push(movie);
                }
                people[i]['crew_in'] = crewInMovies;
                people[i]['cast_in'] = castInMovies;
            }
        }

        res.json({people: people})
    }
    catch(error){
        console.log(error)
        res.sendStatus(400);
    }
}
