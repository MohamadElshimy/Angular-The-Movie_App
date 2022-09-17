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
    backdropPath: string;
    belongsToCollection: string;
    budget: string;
    genres: {id: string, name: string}[];
    homepage: string;
    id: string;
    imdbId: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: string;
    posterPath: string;
    productionCompanies: {id: string, logo_path: string, name: string, origin_country:string}[];
    productionCountries: {iso_3166_1: string, name: string}[];
    releaseDate: string;
    revenue: string;
    runtime: string;
    spokenLanguages: {english_name: string, iso_639_1: string, name: string}[];
    status: string;
    tagline: string;
    title: string;
    video: string;
    videos: {results: result[]};
    voteAverage: string;
    voteCount: string;
}