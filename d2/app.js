const express = require('express')
const config = require('./config')
const app = express()
const mongoose = require('mongoose');
const connectionString = `mongodb://${db.host}:${db.port}/${db.name}`;
mongoose.connect(connectionString)



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${app.port}!`))