const {Movie, People} = require('../../models');

module.exports = async (req, res) => {
    try{
        const {q, num, start} = req.query;
        movies = [];
        people = [];

        movies = await Movie.search(q);
        people = await People.search(q);

        let whole = Array.prototype.concat(movies, people).sort(
          function (a,b){
            if ( a.score > b.score ){
              return -1;
            }
            else if ( b.score > a.score ){
              return 1;
            }
            else {
              return 0;
            }
          }
        );

        var countParam = num;
        var startParam = start;

        if ( (num + startParam) >= whole.length ){
          countParam = whole.length - startParam - 1;
        }
        if ( startParam >= whole.length){
          startParam = 0;
          res.sendStatus(400);
          console.log("start index out of range");
        }


        if (num) res.json({movies: movies.slice(0, parseInt(num)), people: people.slice(0, parseInt(num))})
        else res.json( { result: whole.slice(startParam, startParam + countParam ) } );
    }
    catch(error){
        console.log(error)
        res.sendStatus(400);
    }
}
