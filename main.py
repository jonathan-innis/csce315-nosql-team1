def get_connection():
    try:
        print "Acquiring connection to Mongo..."
        username = 'reader'
        password = 'ilovetamu'
        client = MongoClient('mongodb://%s:%s@13.58.47.75:27017/movies_mongo' % (username, password))
        db = client['movies_mongo']
        return db
    
    except Exception as ex:
        print ex

def getMoviesByMovieId(movie_id):
    return

def getRecordByIMDBId(imdb_id):
    return

def getMovieStats():
    return

def getCaseByMovieId():
    return

def getCreditsStats():
    return

def getAggregateRecordByMovieId(movie_id):
    return