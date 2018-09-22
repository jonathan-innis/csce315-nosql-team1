const {People} = require('../../models');
const {Movie}  = require('../../models');

module.exports = async (req, res) => {
    try{
        const {person_id} = req.query;
        people = await People.findOne({id: person_id});
        res.json(people)
    }
    catch(error){
        console.log(error)
        res.sendStatus(400);
    }
}
