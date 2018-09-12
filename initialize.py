import json

with open('data/credits.json') as json_data:
    credits = json.load(json_data)
    print credits

with open('data/movies.json') as json_data:
    movies = json.load(json_data)
    print movies