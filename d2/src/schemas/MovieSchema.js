const MOVIE_SCHEMA = {
    poster_path: String,
    production_countries: Array,
    revenue: Number,
    overview: String,
    video: Boolean,
    hasCredits: Number,
    id: Number,
    genres: Array,
    title: String,
    tagline: String,
    vote_count: Number,
    homepage: String,
    belongs_to_collection: {backdrop_path: String, poster_path: String, id: Number, name: String},
    original_language: String,
    status: String,
    spoken_languages: Array,
    imdb_id: String,
    adult: Boolean,
    production_companies: Array,
    release_date: String,
    popularity: Number,
    original_title: String,
    budget: Number,
    vote_average: Number,
    runtime: Number,
    credits: {cast: Array, crew: Array}
};

module.exports = MOVIE_SCHEMA;