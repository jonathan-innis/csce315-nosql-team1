import json
import sys
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
        self.credits = None
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
        self.movies = self.get_movies_data()
        movies_collection = self.db['movies']
        movies_collection.insert(self.movies)
        movies_collection.create_index(
            [
                ('id', pymongo.ASCENDING),
                ('credits.id', pymongo.DESCENDING)
            ]
        )

    def create_people_dict(self, credit):
        movies_collection = self.db['movies']
        people = credit['cast'] + credit['crew']

        movie_id = movies_collection.find_one({'id': int(credit['id'])}, {'_id': True})

        for person in people:
            if person['credit_id'] in self.people_dict:
                self.people_dict[person['credit_id']]['movies'].append({'_id' : movie_id})
            else:
                person['movies'] = [{'_id' : movie_id}]
                self.people_dict[person['credit_id']] = person            

    def add_people_collection(self):
        print "Adding the people to the collection..."
        for credit in self.credits:
            self.create_people_dict(credit)
        people_collection = self.db['people']
        people_collection.insert_many(self.people_dict.values())

    def merge_credits_collection(self):
        print "Merging credits into movies..."
        movies_collection = self.db['movies']
        operations = []
        self.credits = self.get_credits_data()takes a source file movie id (from the json) and returns an aggregate object
        for credit in self.credits:
            creditID = int(credit['id'])
            operations.append(pymongo.UpdateOne({u'id': creditID}, {'$set': {u'cast': credit['cast'], u'crew': credit['crew']}}))
        movies_collection.bulk_write(operations, ordered=False)

#Copied code from https://stackoverflow.com/questions/3041986/apt-command-line-interface-like-yes-no-input
def query_yes_no(question, default="yes"):
    """Ask a yes/no question via raw_input() and return their answer.

    "question" is a string that is presented to the user.
    "default" is the presumed answer if the user just hits <Enter>.
        It must be "yes" (the default), "no" or None (meaning
        an answer is required of the user).

    The "answer" return value is True for "yes" or False for "no".
    """
    valid = {"yes": True, "y": True, "ye": True,
             "no": False, "n": False}
    if default is None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("invalid default answer: '%s'" % default)

    while True:
        sys.stdout.write(question + prompt)
        choice = raw_input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            sys.stdout.write("Please respond with 'yes' or 'no' "
                             "(or 'y' or 'n').\n")

def main():
    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:
        if query_yes_no("Would you like to reinitialize the database?"):
            print "Dropping the old database..."
            db.movies.drop()
            db.people.drop()
    
            print "Importing the new database...."
            init = Initialize(db)
            init.add_movies_collection()
            init.merge_credits_collection()
            init.add_people_collection()
            print "Done"
        else:
            print "Quitting..."


if __name__ == '__main__':
    main()
