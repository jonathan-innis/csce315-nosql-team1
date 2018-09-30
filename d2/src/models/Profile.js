const {profiles} = require('../schemas');
const mongoose = require('mongoose');

profiles.statics.findProfile = async function findProfile(email) {
    return await this.model('Profiles', profiles, 'profiles').findOne(
        {
            "email" : email
        }
    )
}

profiles.statics.addProfile= async function addProfile(familyName, givenName, email) {
    return await this.model('Profiles', profiles, 'profiles').create(
        {
            "familyName" : familyName,
            "givenName" : givenName,
            "email" : email,
            "movieFavorites" : [],
            "personFavorites" : []
        }
    )
}

profiles.statics.likePerson = async function likePerson(email, personID) {
    return await this.model('Profiles', profiles, 'profiles').updateOne(
        {
            "email" : email
        },
        {
            $addToSet : {
                personFavorites : personID
            }
        }
    )
}

profiles.statics.likeMovie = async function likeMovie(email, movieID) {
    return await this.model('Profiles', profiles, 'profiles').updateOne(
        {
            "email" : email
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