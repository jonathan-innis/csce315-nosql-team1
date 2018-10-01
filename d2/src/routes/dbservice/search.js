const {Movie, People} = require('../../models');

module.exports = async (req, res) => {
    try{
        const {q, num, start} = req.query;
        movies = [];
        people = [];

        movies = await Movie.search(q);
        people = await People.search(q);

        let whole = movies.concat(people);
        await whole.sort(
          function ( a, b ){
            if ( parseFloat(a.score) > parseFloat(b.score) ){
              return 1;
            }
            if ( parseFloat(a.score) < parseFloat(b.score) ){
              return -1;
            }
            return 0;
          }  );

        var countParam = parseInt(num);
        var startParam = parseInt(start);

        res.json( { result: whole.slice( startParam, startParam + countParam ) } );
    }
    catch(error){
        console.log(error)
        res.sendStatus(400);
    }
}
