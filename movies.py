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
    """Takes in a movie_id and returns the corresponding movie that is associated with it
    
    Arguments:
        movie_id: unique integer identifier for a movie
    Assumptions:
        Assumes the movie collection has already been initialized
    """

    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        movie_collection = db['movies']
        ret = movie_collection.find({'id': movie_id})
        print dumps(ret.explain()['executionStats'])
        if ret.count() <= 0:
            return "There is no movie with this id"
        for doc in ret:
            return dumps(doc)

def getRecordByIMDBId(imdb_id):
    return

def getMovieStats():
    return

def getCaseByMovieId():
    return

def getCreditsStats():
    return

def getPersonById(person_id):
    """Takes in a person_id and returns the corresponding person that is associated with it
    
    Arguments:
        person_id: unique integer identifier for a person
    Assumptions:
        Assumes the person and movie collection have already been initialized
    """

    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
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

    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        movie_collection = db['movies']
        ret = movie_collection.find({'id': movie_id})
        print dumps(ret.explain()['executionStats'])
        if ret.count() <= 0:
            return "There is no movie with this id"
        for doc in ret:
            return dumps(doc)