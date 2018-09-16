import json
import pymongo
from pymongo import MongoClient
from MovieBaseClasses import MongoConnection

USERNAME = 'tamu'
PASSWORD = 'notatouchback'
COLLECTION = 'movies_mongo'
DB_ENDPOINT = 'mongodb://{username}:{password}@13.58.47.75:27017/movies_mongo'.format(
    password=PASSWORD,
    username=USERNAME
)

def get_credits_data():
    with open('data/credits.json') as json_data:
        credits = json.load(json_data)
        return credits

def get_movies_data():
    with open('data/movies.json') as json_data:
        movies = json.load(json_data)
        return movies

def main():
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        ############################
        #print "Importing movies..."
        movies_collection = db['movies']
        #movies_collection.insert(get_movies_data())
        ############################
        print "Importing credits..."
        credits = get_credits_data()
        movies_collection.create_index(
            [
                ('id', pymongo.ASCENDING),
                ('credits.id', pymongo.DESCENDING)
            ]
        )

        for credit in credits:
            creditID = int(credit['id'])

            movies_collection.update(
                {
                    u'id' : creditID
                },
                {
                    "$set" : {
                        u'credits' : credit['cast']
                    }
                }
            )
            print("updated:{id}".format(id=creditID))

        """
        #TODO Clean up this function of any bad practices
        #TODO Get it to connect to the mongo server consistently
        """
        print "Done"


#Record of the population of the cast and crew objects
def createCastCrew():
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        crew = {}
        cast = {}
        movies = db['movies'].find()
        for movie in movies:
            for member in movie[u'cast']:
                if member[u'id'] in cast:
                    cast[member[u'id']]["movies"].append(movie[u'id'])
                else:
                    cast[member[u'id']] = {
                        "id" : member[u'id'],
                        "name": member[u'name'], 
                        "gender": member[u'gender'], 
                        "profile_path": member[u'profile_path'],
                        "movies": [movie[u'id']]            
                    }
            for member in movie[u'crew']:
                if member[u'id'] in crew:
                    crew[member[u'id']]["movies"].append(movie[u'id'])
                else:
                    crew[member[u'id']] = {
                        "id" : member[u'id'],
                        "name": member[u'name'], 
                        "gender": member[u'gender'], 
                        "profile_path": member[u'profile_path'],
                        "movies": [movie[u'id']]
                    }
        mongo_cast = []
        mongo_crew = []
        for ID in cast:
            mongo_cast.append(cast[ID])
        for ID in crew:
            mongo_crew.append(crew[ID])

        db['cast'].insert(mongo_cast)
        db['crew'].insert(mongo_crew)
        

if __name__ == '__main__':
    main()
