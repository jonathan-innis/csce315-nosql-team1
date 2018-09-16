from pymongo import MongoClient
import pprint
from MovieBaseClasses import MongoConnection
import time
from bson.json_util import dumps


USERNAME = 'reader'
PASSWORD = 'ilovetamu'
COLLECTION = 'movies_mongo'
DB_ENDPOINT = 'mongodb://{username}:{password}@13.58.47.75:27017/movies_mongo'.format(
    password=PASSWORD,
    username=USERNAME
)

def getMoviesByMovieId(movie_id):
    return

def getRecordByIMDBId(imdb_id):
    return

def getMovieStats():
    return


def getCastByMovieId(_movie_id):
    """
    Fetches the cast based on a provided number _movie_id

    if there is no movie found with that number it returns NoneType

    if a movie is found it returns the cast entry
    """
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        movie = db['movies'].find_one(
            {
                u'id' : int(_movie_id)
            },
            {
                u'_id' : 0,
                u'cast' : 1
            }
        )
        if movie:
            return dumps(movie.get(u'cast', None))
        else:
            return None

def getMoviesStats():
    """
    Fetches a cursor with all movies from the database, only containing the runtime and genre fields

    sums the total runtimes, number of unique genres, and the total count returned by the cursor

    """

    response = """Total Movies: {count}\nTotal Runtime: {runtime}\nUnique Genres: {genres}"""

    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        cursor = db['movies'].find(
            {},
            {
                u'_id' : 0,
                u'genres' : 1,
                u'runtime' : 1
            }
        )

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
        runtime=time.strftime("%d days, %H:%M:%S", time.gmtime(runtime * 60)),
        genres=len(genres)
    )

def getAggregateRecordByMovieId(movie_id):
    return

def main():
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        pprint.pprint(db)
    return

if __name__ == "__main__":
    main()