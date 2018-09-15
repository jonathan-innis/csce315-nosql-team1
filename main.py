from pymongo import MongoClient
import pprint
from MovieBaseClasses import MongoConnection


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

def getCreditsStats():
    return

def getAggregateRecordByMovieId(movie_id):
    return

def main():
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        pprint.pprint(db)
    return

if __name__ == "__main__":
    main()