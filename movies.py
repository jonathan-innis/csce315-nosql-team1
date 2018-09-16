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
        ret = movie_collection.find_one({'id': movie_id})
        if ret is None:
            print "There is no movie with this id"
        return dumps(ret)

def getRecordByIMDBId(imdb_id):
    return

def getMovieStats():
    return

def getCaseByMovieId():
    return

def getCreditsStats():
    return

def getPersonById(person_id):
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        people_collection = db['people']
        movie_collection = db['movies']
        person = people_collection.find_one({'id': person_id})
        if 'cast_in' in person:
            cast_in = []
            for movie_id in person['cast_in']:
                cast_in.append(movie_collection.find_one({'_id': movie_id}))
            person['cast_in'] = cast_in
        
        if 'crew_in' in person:
            crew_in = []
            for movie_id in person['crew_in']:
                crew_in.append(movie_collection.find_one({'_id': movie_id}))
            person['crew_in'] = crew_in
        
        return dumps(person)

def getAggregateRecordByMovieId(movie_id):
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        movie_collection = db['movies']
        ret = movie_collection.find_one({'id': movie_id})
        if ret is None:
            print "There is no movie with this id"
        return dumps(ret)