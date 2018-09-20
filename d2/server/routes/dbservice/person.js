const {People} = require('../../models');
const {Movie}  = require('../../models');

module.exports = async (req, res) => {
    try{
        const {person_id} = req.query;
        people = [];

        people = await People.find({id: person_id});

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

        res.json({people: people})
    }
    catch(error){
        console.log(error)
        res.sendStatus(400);
    }
}
