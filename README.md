# CSCE MongoDB Project

## Setup

## Deliverable 1
- Create a new database called movies_mongo. Use it while developing the functionality below.
- Read from the data file movies.json. Form a movies collection.
- Provide a function getRecordByMovieId(movie_id) that  returns the full movie record, as json, for that id.
- Provide a function getRecordByIMDBId(imdb_id) that returns the full movie record, as json, for that id.
- Provide a function getMovieStats(), which returns the following aggregate reporting about the entire movies collection, as a string:

      Movies: <num_movies>
      Total Running Time: <hours:minutes>
      Unique genres: <num_genres>

- Read from the data file credits.json.
- Provide a function getCastByMovieId(movie_id) that takes a source file movie id (from the json) and returns the cast for that id, as json.
- For 10 extra points, provide a function getCreditsStats(), which returns the following aggregate reporting about the entire movies collection, as a string:

       Credits Entries: <total_num_credits_entries>
       Cast Members: <num_unique_cast_entries>
       Crew Members: <num_unique_crew_entries>
       
- Provide a function getAggregateRecordByMovieId(movie_id) that takes a source file movie id (from the json) and returns an aggregate object, which contains the full movie record, cast, and crew for that id, as json.
