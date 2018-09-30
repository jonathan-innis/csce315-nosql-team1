const {profiles} = require('../schemas');
const mongoose = require('mongoose');

profiles.statics.findProfile = async function findProfile(userID) {
    return await this.model('Profiles', profiles, 'profiles').findOne(
        {
            "id" : userID
        }
    )
}

profiles.statics.addProfile= async function addProfile(userID, familyName, givenName, email) {
    return await this.model('Profiles', profiles, 'profiles').create(
        {
            "id" : userID,
            "familyName" : familyName,
            "givenName" : givenName,
            "email" : email,
            "movieFavorites" : [],
            "personFavorites" : []
        }
    )
}

profiles.statics.likePerson = async function likePerson(userID, personID) {
    return await this.model('Profiles', profiles, 'profiles').updateOne(
        {
            "id" : userID
        },
        {
            $addToSet : {
                personFavorites : personID
            }
        }
    )
}

profiles.statics.likeMovie = async function likeMovie(userID, movieID) {
    return await this.model('Profiles', profiles, 'profiles').updateOne(
        {
            "id" : userID
        },
        {
            $addToSet : {
                movieFavorites : movieID
            }
        }
    )
}    

let Profile = mongoose.model('Profiles', profiles, 'profiles');

module.exports = Profile