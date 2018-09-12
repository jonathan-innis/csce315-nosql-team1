import json
from pymongo import MongoClient

def get_credits_data():
    with open('data/credits.json') as json_data:
        credits = json.load(json_data)
        return credits

def get_movies_data():
    with open('data/movies.json') as json_data:
        movies = json.load(json_data)
        return movies

def get_connection():
    try:
        print "Acquiring connection to Mongo..."
        client = MongoClient('localhost', 27017)
        db = client['movies_mongo']
        print "Importing movies..."
        movies_collection = db['movies']
        movies_collection.insert(get_movies_data())
        print "Importing credits..."
        credits_collection = db['credits']
        credits_collection.insert(get_credits_data())
        print "Done"
    
    except Exception as ex:
        print ex

def main():
    get_connection()

if __name__ == '__main__':
    main()
