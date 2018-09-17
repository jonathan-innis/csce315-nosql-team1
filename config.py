COLLECTION = 'movies_mongo'
READER_DB_ENDPOINT = 'mongodb://{username}:{password}@13.58.47.75:27017/movies_mongo'.format(
    username='reader',
    password='ilovetamu'
)
WRITER_DB_ENDPOINT = 'mongodb://{username}:{password}@13.58.47.75:27017/movies_mongo'.format(
    username='tamu',
    password='notatouchback'
)