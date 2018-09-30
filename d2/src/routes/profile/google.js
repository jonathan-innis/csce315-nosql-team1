const {Profile} = require('../../models');
const {OAuth2Client} = require('google-auth-library');


const CLIENT_ID = "61301743792-kpgmt4gnscti2tren89sc5t4nfk7iq15.apps.googleusercontent.com"
const SECRET = "ZqqhkVxGmgHylO4-bbnk0maN"
const client = new OAuth2Client(CLIENT_ID);

google = async (req, res) => {
    try{

        console.log(res.body)
        
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    google
} 