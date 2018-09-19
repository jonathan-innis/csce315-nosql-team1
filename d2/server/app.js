const express = require('express')
const {getDb} = require('./initDB');
const app = express()
const port = 3000

getDb().then((db) => {
    app.use('/', require('./routes'))
    app.listen(port, () => console.log(`Express listening on port ${port}!`))
})
.catch(error => {
    console.log(error)
});