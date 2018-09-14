import json
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
from MovieBaseClasses import MongoConnection

USERNAME = 'tamu'
PASSWORD = 'notatouchback'
COLLECTION = 'movies_mongo'
DB_ENDPOINT = 'mongodb://{username}:{password}@13.58.47.75:27017/movies_mongo'.format(
    password=PASSWORD,
    username=USERNAME
)

class Initialize:
    def __init__(self, db):
        self.people_dict = {}
        self.db = db

    def get_credits_data(self):
        with open('data/credits.json') as json_data:
            credits = json.load(json_data)
            return credits

    def get_movies_data(self):
        with open('data/movies.json') as json_data:
            movies = json.load(json_data)
            return movies

    def add_movies_collection(self):
        print "Importing movies..."
        movies = self.get_movies_data()
        movies_collection = self.db['movies']
        movies_collection.insert(movies)
        movies_collection.create_index(
            [
                ('id', pymongo.ASCENDING),
                ('credits.id', pymongo.DESCENDING)
            ]
        )

    def create_people_dict(self, credit):
        movies_collection = self.db['movies']
        people = credit['cast'] + credit['crew']

        movie_id = movies_collection.find_one({u'id': int(credit['id'])})['_id']

        for person in people:
            if person['credit_id'] in self.people_dict.keys():
                self.people_dict[person['credit_id']]['movies'].append({'_id' : ObjectId(movie_id)})
            else:
                person['movies'] = [{'_id' : ObjectId(movie_id)}]
                self.people_dict[person['credit_id']] = person            

    def add_people_collection(self):
        people_collection = self.db['people']
        for _id in self.people_dict.keys():
            people_collection.insert(self.people_dict[_id])

    def merge_credits_collection(self):
        print "Merging credits into movies..."
        movies_collection = self.db['movies']
        credits = self.get_credits_data()
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
            self.create_people_dict(credit)

        self.add_people_collection()

def main():
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        init = Initialize(db)
        init.add_movies_collection()
        init.merge_credits_collection()


if __name__ == '__main__':
    main()
