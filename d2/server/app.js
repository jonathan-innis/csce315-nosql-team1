const express = require('express')
const config = require('./config')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const { db } = config;
const connectionString = `mongodb://${db.host}:${db.port}/${db.name}`;

mongoose.connect(connectionString, {useNewUrlParser: true})
.then(() => {
    app.use('/', require('./routes'))
    app.listen(port, () => console.log(`Express listening on port ${port}!`))
})
.catch(error => {
    console.log(error)
});