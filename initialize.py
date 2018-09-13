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

def add_movies_collection(db):
    print "Importing movies..."
    movies = get_movies_data()
    movies_collection = db['movies']
    movies_collection.insert(movies)
    movies_collection.create_index(
        [
            ('id', pymongo.ASCENDING),
            ('credits.id', pymongo.DESCENDING)
        ]
    )

def merge_credits_collection(db):
    print "Merging credits into movies..."
    movies_collection = db['movies']
    credits = get_credits_data()
    for credit in credits:
        creditID = int(credit['id'])

        movies_collection.update(
            {
                u'id' : creditID
            },
            {
                "$set" : {
                    u'credits' : {
                        u'cast' : credit['cast'],
                        u'crew' : credit['crew']
                    }
                }
            }
        )
        print("updated:{id}".format(id=creditID))

def main():
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        add_movies_collection(db)
        merge_credits_collection(db)


if __name__ == '__main__':
    main()
