from pymongo import MongoClient
from bson.json_util import dumps
from MovieBaseClasses import MongoConnection


USERNAME = 'reader'
PASSWORD = 'ilovetamu'
COLLECTION = 'movies_mongo'
DB_ENDPOINT = 'mongodb://{username}:{password}@13.58.47.75:27017/movies_mongo'.format(
    password=PASSWORD,
    username=USERNAME
)

def getMoviesByMovieId(movie_id):
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        movie_collection = db['movies']
        return dumps(movie_collection.find_one({'id': movie_id}))

def getRecordByIMDBId(imdb_id):
    return

def getMovieStats():
    return

def getCaseByMovieId():
    return

def getCreditsStats():
    return

def getPersonById(person_id):
    return

def getAggregateRecordByMovieId(movie_id):
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        movie_collection = db['movies']
        return dumps(movie_collection.find_one({'id': movie_id}))