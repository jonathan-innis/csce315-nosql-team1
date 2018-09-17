import json
import sys
import pymongo
import time
import argparse
from pymongo import MongoClient
from bson.objectid import ObjectId
from MovieBaseClasses import MongoConnection

class Initialize:
    def __init__(self, db):
        """Initializes the Initialize object"""

        self.people_dict = {}
        self.credits = None
        self.movies = None
        self.db = db

    def get_credits_data(self):
        """Gets all of the data from movies.json

        Assumptions:
            Assumes that the credits.json file is located
            within the data directory
        """

        with open('data/credits.json') as json_data:
            credits = json.load(json_data)
            self.credits = credits

    def get_movies_data(self):
        """Gets all of the data from movies.json

        Assumptions:
            Assumes that the movies.json file is located
            within the data directory
        """

        with open('data/movies.json') as json_data:
            movies = json.load(json_data)
            self.movies = movies

    def add_movies_collection(self):
        """Adds the movies collection to the database along
        with the required indexes"""

        print "Importing movies..."
        
        movies_collection = self.db['movies']
        movies_collection.insert(self.movies)
        movies_collection.create_index(
            [
                ('id', pymongo.ASCENDING),
                ('imdb_id', pymongo.ASCENDING),
            ]
        )

    def make_person(self, data):
        person = {
            'name' : data['name'],
            'gender' : data['gender'],
            'credit_id' : data['credit_id'],
            'profile_path' : data['profile_path'],
            'id' : data['id']
        }
        return person 

    def create_people_dict(self, credit, cache_movie_dict):
        """Creates a dictionary of people that can then be inserted into the
        mongoDB database. 

        Args:
            credit: a credit from the credits object pulled from credits.json
            cache_movie_dict: a dictionary formed from moving through the movies collection
            and taking all of the data from that collection
        """
        movies_collection = self.db['movies']
        people = credit['cast'] + credit['crew']

        movie_id = cache_movie_dict[int(credit['id'])]['_id']

        #Appending movies that a person is cast in
        for person in credit['cast']:
            if person['id'] in self.people_dict:
                if 'cast_in' in self.people_dict[person['id']]:
                    self.people_dict[person['id']]['cast_in'].append(movie_id)
                else:
                    self.people_dict[person['id']]['cast_in'] = [movie_id]
            else:
                new_person = self.make_person(person)
                new_person['cast_in'] = [movie_id]
                self.people_dict[new_person['id']] = new_person 

        #Appending movies that the person is a crew in    
        for person in credit['crew']:
            if person['id'] in self.people_dict:
                if 'crew_in' in self.people_dict[person['id']]:
                    self.people_dict[person['id']]['crew_in'].append(movie_id)
                else:
                    self.people_dict[person['id']]['crew_in'] = [movie_id]
            else:
                new_person = self.make_person(person)
                new_person['crew_in'] = [movie_id]
                self.people_dict[new_person['id']] = new_person  

    def add_people_collection(self):
        """Adds all of the unique people from credits.json into the database
        under the people collection. Forms a cached python dictionary to help
        with efficiency communicating with the server

        Assumptions:
            Assumes that the movies collection is already built in the database
        """

        print "Adding the people to the collection..."

        #Caching the movies so that you have all the data from mongo
        cache_movie_dict = {}
        movies_collection = self.db['movies']
        cache_movies = movies_collection.find()
        for movie in cache_movies:
            cache_movie_dict[movie['id']] = movie

        #Moving through credits and adding unique persons from credits to credit_collection
        for credit in self.credits:
            self.create_people_dict(credit, cache_movie_dict)
        people_collection = self.db['people']
        people_collection.create_index('id')
        people_collection.insert_many(self.people_dict.values())

    def merge_credits_collection(self):
        """Merges the credits.json file into the movies collection. Takes
        the id in the credits objects from the credits.json file and puts 
        the collection in the movies collection

        Assumptions:
            Assumes the movie collection has already been formed
        """
        
        print "Merging credits into movies..."
        movies_collection = self.db['movies']
        bulk_operations = []

        #Moves through the credits and appends credit to movie collection
        for credit in self.credits:
            creditID = int(credit['id'])
            bulk_operations.append(pymongo.UpdateOne(
                { u'id': creditID }, 
                {'$set': {
                    u'credits' : {
                        u'cast': credit['cast'],
                        u'crew': credit['crew']
                    }
                }}))
        movies_collection.bulk_write(bulk_operations, ordered=False)

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

    #Parsing command-line and initializing the database
    parser = argparse.ArgumentParser()
    parser.add_argument("--hostname", help="Host name")
    parser.add_argument("--port", help="Port")
    parser.add_argument("-u", "--username", help="User name")
    parser.add_argument("-p", "--password", help="Password")
    parser.add_argument("-d", "--database", help="Database")

    args = parser.parse_args()

    DB_ENDPOINT = 'mongodb://{username}:{password}@{hostname}:{port}/{database}'.format(
        password=args.password,
        username=args.username,
        hostname=args.hostname,
        database=args.database,
        port=args.port
    )

    COLLECTION = args.database

    with MongoConnection(COLLECTION, DB_ENDPOINT) as db:

        if query_yes_no("Would you like to reinitialize the database?"):
            last = time.time()
            print "Dropping the old database..."
            db.movies.drop()
            db.people.drop()
    
            print "Importing the new database...."
            init = Initialize(db)
            init.get_credits_data()
            init.get_movies_data()
            init.add_movies_collection()
            print "Finished inserting the movies collection (%ss)"%(int(time.time() - last))
            last = time.time()
            init.merge_credits_collection()
            print "Finished merging the credits collection (%ss)"%(int(time.time() - last))
            last = time.time()
            init.add_people_collection()
            print "Finished adding the people collection (%ss)"%(int(time.time() - last))
            last = time.time()
        else:
            print "Quitting..."

        

if __name__ == '__main__':
    main()
