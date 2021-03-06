from pymongo import MongoClient
from bson.json_util import dumps
from MovieBaseClasses import MongoConnection
import config

def getRecordByMovieId(movie_id):
    """Takes in a movie_id and returns the corresponding movie that is associated with it

    Arguments:
        movie_id: unique integer identifier for a movie
    Assumptions:
        Assumes the movie collection has already been initialized
    """

    with MongoConnection(config.COLLECTION, config.READER_DB_ENDPOINT) as db:
        movie_collection = db['movies']
        ret = movie_collection.find({'id': movie_id})
        print dumps(ret.explain()['executionStats'])
        if ret.count() <= 0:
            return "There is no movie with this id"
        for doc in ret:
            return dumps(doc)

def getRecordByIMDBId(imdb_id):
    """Takes in a imdb_id and returns the corresponding movie that is associated with it

    Arguments:
        imdb_id: unique string identifier for the imdb_id
    Assumptions:
        Assumes the movie collection has already been initialized
    """

    with MongoConnection(config.COLLECTION, config.READER_DB_ENDPOINT) as db:
        movie_collection = db['movies']
        ret = movie_collection.find({'imdb_id': imdb_id})
        print dumps(ret.explain()['executionStats'])
        if ret.count() <= 0:
            return "There is no movie with this imdb id"
        for doc in ret:
            return dumps(doc)

def getMovieStats():
    """
    Fetches a cursor with all movies from the database, only containing the runtime and genre fields

    sums the total runtimes, number of unique genres, and the total count returned by the cursor

    """

    response = """Total Movies: {count}\nTotal Runtime: {runtime}\nUnique Genres: {genres}"""

    with MongoConnection(config.COLLECTION, config.READER_DB_ENDPOINT) as db:
        cursor = db['movies'].find(
            {},
            {
                u'_id' : 0,
                u'genres' : 1,
                u'runtime' : 1
            }
        )

        print dumps(cursor.explain()['executionStats'])

        runtime = 0
        genres = {}
        totalMovies = cursor.count()

        for movie in cursor:
            if movie[u'runtime']:
                runtime += movie[u'runtime']
            for genre in movie[u'genres']:
                if genre[u'id'] not in genres:
                    genres[genre[u'id']] = genre[u'name']

    return response.format(
        count=totalMovies,
        runtime="{hours}:{minutes}".format(hours=(runtime / 60), minutes=(runtime % 60)),
        genres=len(genres)
    )

def getCastByMovieId(_movie_id):
    """
    Fetches the cast based on a provided number _movie_id

    if there is no movie found with that number it returns NoneType

    if a movie is found it returns the cast entry
    """
    with MongoConnection(config.COLLECTION, config.READER_DB_ENDPOINT) as db:
        cursor = db['movies'].find(
            {
                'id' : int(_movie_id)
            },
            {
                '_id' : 0,
                'credits' : 1
            }
        )

        print dumps(cursor.explain()['executionStats'])

        if cursor.count() > 0:
            credits = cursor[0].get(u'credits', None)
            if credits is not None:
                return dumps(credits.get(u'cast', None))
        else:
            return 'There is no movie with this movie id'

def getCreditsStats():
    """
    Fetches three cursors containing movies with credits, people that are crew, and people that are cast respectively. 
    Returns the sums of each of these cursors as a string.

    """
    response = ''

    with MongoConnection(config.COLLECTION, config.READER_DB_ENDPOINT) as db:
        credit_cursor = db['movies'].find({'credits':{'$exists':True}})
        print dumps(credit_cursor.explain()['executionStats'])

        crew_cursor = db['people'].find({'crew_in':{'$exists':True}})
        print dumps(crew_cursor.explain()['executionStats'])

        cast_cursor = db['people'].find({'cast_in':{'$exists':True}})
        print dumps(cast_cursor.explain()['executionStats'])

        credit_entries = credit_cursor.count()
        cast_entries = crew_cursor.count()
        crew_entries = cast_cursor.count()

        response += 'Credits Entries: ' + str(credit_cursor.count())
        response += '\nCast Members: ' + str(crew_cursor.count())
        response += '\nCrew Members: ' + str(cast_cursor.count())

        return response
   

def getPersonById(person_id):
    """Takes in a person_id and returns the corresponding person that is associated with it

    Arguments:
        person_id: unique integer identifier for a person
    Assumptions:
        Assumes the person and movie collection have already been initialized
    """

    with MongoConnection(config.COLLECTION, config.READER_DB_ENDPOINT) as db:
        people_collection = db['people']
        movie_collection = db['movies']
        person_result = people_collection.find({'id': person_id})
        print person_result.explain()['executionStats']

        if person_result.count() <= 0:
            return "There is no person with this id"

        person = person_result[0]

        #Replaces the cast_in array with the actual movies associated with the ids
        if 'cast_in' in person:
            cast_in = []
            for movie_id in person['cast_in']:
                cast_result = movie_collection.find({'_id': movie_id})
                print dumps(cast_result.explain()['executionStats'])
                for cast in cast_result:
                    cast_in.append(cast)
            person['cast_in'] = cast_in

        #Replaces the crew_in array with the actual movies associated with the ids
        if 'crew_in' in person:
            crew_in = []
            for movie_id in person['crew_in']:
                crew_result = movie_collection.find({'_id': movie_id})
                print dumps(crew_result.explain()['executionStats'])
                for crew in crew_result:
                    crew_in.append(crew)
            person['crew_in'] = crew_in

        return dumps(person)

def getAggregateRecordByMovieId(movie_id):
    """Takes in a movie_id and returns the corresponding movie that is associated with it

    Arguments:
        movie_id: unique integer identifier for a movie
    Assumptions:
        Assumes the movie collection has already been initialized
    """

    with MongoConnection(config.COLLECTION, config.READER_DB_ENDPOINT) as db:
        movie_collection = db['movies']
        ret = movie_collection.find({'id': movie_id})
        print dumps(ret.explain()['executionStats'])
        if ret.count() <= 0:
            return "There is no movie with this id"
        for doc in ret:
            return dumps(doc)