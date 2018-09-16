from pymongo import MongoClient
import pprint
from MovieBaseClasses import MongoConnection
import time


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

# Fetches the cast of a movie (no crew returned)
def getCastByMovieId(_movie_id):
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
            return movie.get(u'cast', None)
        else:
            return None

def getMoviesStats():
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