export interface result {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: string;
    published_at: string;
    site: string;
    size: string;
    type: string;
}

export interface MovieDetailed {
    adult: string;
    backdrop_path: string;
    belongs_to_collection: string;
    budget: string;
    genres: {id: string, name: string}[];
    homepage: string;
    id: string;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: string;
    poster_path: string;
    production_companies: {id: string, logo_path: string, name: string, origin_country:string}[];
    production_countries: {iso_3166_1: string, name: string}[];
    release_date: string;
    revenue: string;
    runtime: string;
    spoken_languages: {english_name: string, iso_639_1: string, name: string}[];
    status: string;
    tagline: string;
    title: string;
    video: string;
    videos: {results: result[]};
    vote_average: string;
    vote_count: string;
}