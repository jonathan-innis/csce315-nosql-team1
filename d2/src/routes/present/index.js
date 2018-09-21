const express = require('express');
const path = require('path');
let router = express.Router();


router.get('/movie', (req, res) =>
    res.sendFile(path.resolve('public/movie.html'))
)

router.get('/person', (req, res) =>
    res.sendFile(path.resolve('public/person.html'))
)

router.get('/results', (req, res) =>
    res.sendFile(path.resolve('public/results.html'))
)



module.exports = router;