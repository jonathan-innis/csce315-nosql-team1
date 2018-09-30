const {Profile, Movie, People} = require('../../models');

const {OAuth2Client} = require('google-auth-library');


const CLIENT_ID = "61301743792-kpgmt4gnscti2tren89sc5t4nfk7iq15.apps.googleusercontent.com"
const SECRET = "ZqqhkVxGmgHylO4-bbnk0maN"
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return {
        id: payload.sub, 
        familyName : payload.family_name,
        givenName : payload.given_name,
        email : payload.email
    }
}


favoriteMovie = async (req, res) => {
    
    try{
        
        let person = await verify(req.body.token)

        let entry = await Profile.findProfile(person.id)

        if (entry === null) {
            Profile.addProfile(profile.id, profile.familyName, profile.givenName, profile.email)
        }

        await Profile.likeMovie(profile.id, req.body.movie_id);


        
    } catch(error) {
        console.log(error)
    }
  
}

favoritePerson = async (req, res) => {
    
    try{
        let profile = await verify(req.body.token)

        let entry = await Profile.findProfile(profile.id)

        if (entry === null) {
            Profile.addProfile(profile.id, profile.familyName, profile.givenName, profile.email)
        }

        await Profile.likePerson(person.id, req.body.person_id);


    } catch(error) {
        console.log(error)
    }
}

getProfile = async (req, res) => {
    try {
        
        let profile = await verify(req.body.token)
        
        let entry = await Profile.findProfile(profile.id)
        

        if (entry == null) {
            res.body = {"error" : "user does not exist"}
        
        }
        else {
            
            let m = Movie.find({
                'id' : { $in : entry.movieFavorites}
            })

            let p = await People.find({
                'id' : { $in : entry.personFavorites}
            }).

            p.

            res.json({movies: m, people: p})
        }

        
    } catch(error) {
        console.log(error)
    } 
}



module.exports = {
    favoritePerson,
    favoriteMovie,
    getProfile
} 
