// config.js
const env = 'dev'; // 'prod' or 'dev'

const prod = {
 app: {
   port: 3000
 },
 db: {
   host: 'reader:ilovetamu@13.58.47.75',
   port: 27017,
   name: 'movies_mongo'
 }
};

const dev = {
 app: {
   port: 3000
 },
 db: {
   host: 'localhost',
   port: 27017,
   name: 'movies_mongo'
 }
};

const config = {
 dev,
 prod
};

module.exports = config[env];