const mongoose = require('mongoose');
const config = require('./config');

const { db } = config;
const connectionString = `mongodb://${db.host}:${db.port}/${db.name}`;

module.exports = {
    getDb: async () => {
        const db = await mongoose.connect(connectionString, {useNewUrlParser: true});
        return db
    },
}