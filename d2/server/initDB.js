const mongoose = require('mongoose');
const config = require('./config');

const { db } = config;
const connectionString = `mongodb://${db.host}:${db.port}/${db.name}`;

async function insertMovieData(){
    
}

async function insertPeopleData(){

}

module.exports = {
    getDb: async () => {
        const db = await mongoose.connect(connectionString, {useNewUrlParser: true});
        return db
    },
}