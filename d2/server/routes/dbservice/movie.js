module.exports = async (req, res) => {
    const {q} = req.query;
    try{
        res.sendStatus(200)
    }
    catch{
        res.sendStatus(400);
    }
}