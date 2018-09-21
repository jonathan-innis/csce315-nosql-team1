# CSCE MongoDB Project

## Development Log
https://github.tamu.edu/jonathan-innis/csce315-nosql-team1/wiki

## Database Setup
This setup assumes that you have MongoDB installed/access to the AWS VM as well as Python 2.7 installed.

1. Make sure that the `credits.json` and `movies.json` file inside a `data/` directory
2. Activate your virtual environment (if you have one)
3. Install the packages to the virtual environment using `pip install -r requirements.txt`
4. If you are running the program locally or you would like to reinitialize the database run the command `python initialize.py`
5. Run the library commands by going into the python shell `python` and importing the module `import movies`

## Website Setup
This setup assumes that you have Node.js installed/access to the AWS VM

1. Run `npm install` on the `/d2/server` directory
2. Run `node app.js` to start the server. The server should be listening on `localhost:3000` at this point
3. Go to `http://localhost:3000` in the browser to see the website

## Deliverable 2
### Backend (Node.js)
- Setup Node.js (web server), Express.js (routing from URL paths to (your) JavaScript code and/or templates in the web server), Mongoose (connect to MongoDB in your web server JavaScript code) the and a template engine (server-side structure for web pages, including passing data that you retrieved from MongoDB), such as Pug or Handlebars, on your cloud box.
- Create a web service that provides data, as JSON, from your MongoDB instance through your web app. We highly recommend that you use Mongoose to do this. If so, install Mongoose. Use Express and (we expect) Mongoose to create 3 public web service API endpoints
- `/dbservice/movie?movie_id=int`
Return all the useful data about a movie, as JSON. The dataset includes many fields for each movie. Make sure to return all of them!
- `/dbservice/person?person_id=int`
Return useful data about a person, as JSON. You may notice, our dataset is relatively impoverished for each person, compared to the movie data.
- `/dbservice/search?q=query_string&num=max_num_results`
Return, as JSON, an array of matching movie objects and an array of matching people objects. The query string should be either a movie title or person name. To generate the results, perform 2 find operations, with the same query_string, perhaps padded with wildcard characters, on: (1) your movies collection and (2) your persons collection. For each find operation, build and return an array. In most cases, one of these arrays will be empty. Sometimes, both may be empty. The num parameter let's the caller limit the number of maximum number of results for each query.

### Frontend (Pug/React.js)
- Create a website that uses HTML5, including CSS and perhaps JavaScript, to present movies data to users.
- A home page, as `/`. 
This is a good place to include a description of your site, effectively present content, which includes links to popular movies and actors, and a text entry field for a search function. (To streamline the presentation, you may choose to have an about page, linked from here, which describes your website, and skip the description on your home page.)
- Search results page, as `/present/results?query`. Implement this as 2 separate find operations, one on the movies collection, another on the persons collection, using the same code as in your /dbservice/search?q=query_string. You may limit the number of results you show to a maximum of 10, to avoid dealing with partitioning the result set in case of large numbers of results.
- Pages for each movie, as `/present/movie?movie_id`. Here you will effectively present at least all the above data, which is relevant to users, about each movie, including nice entries (with links) to the page for each cast and crew member that was part of it. Also include site navigation, such as to the home page.
- Pages for each person (cast and crew), as `/present/person?person_id`. Here you will effectively present at least the data from your service, which is relevant to users, about each person, including nice entries (with links) to the page for each movie they performed in and each movie that they were crew for. Also include navigation, such as to the home page.

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
