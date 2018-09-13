from pymongo import MongoClient
class MongoConnection():
    def __init__(self, _collection, _endpoint):
        self.collection = _collection
        self.endpoint = _endpoint
        self.client = None
    def __enter__(self):
        print "Acquiring connection to Mongo..."
        self.client = MongoClient(self.endpoint)
        return self.client[self.collection]
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.client.close()
        #any closing actions that will be needed in the future
        #error handling for db will go here as well
        #with statements allow for scope and error control


#usage of MongoConnection
#with MongoConnection(foo, bar) as db:
#   db stuff...