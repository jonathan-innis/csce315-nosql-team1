const {Movie} = require('../../models');

module.exports = async (req, res) => {
    const {q} = req.query;
    try{
        res.sendStatus(200);
    }
    catch (error){
        res.sendStatus(400);
    }
}