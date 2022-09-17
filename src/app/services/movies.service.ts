import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Movie } from '../shared/movie.model';
import { MovieDetailed } from '../shared/movie-detailed.model';
import { AuthService } from './auth.service';

export interface MoviesResponseData {
  page: string;
  results: Movie[];
  total_pages: string;
  total_results: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  fetchMoviesRequest(pageNumber: number){
    let searchParams = new HttpParams();
    // searchParams = searchParams.append('api_key','029dea97c6491c890795a485b2ebdbc0');
    // searchParams = searchParams.append('language','en-US');
    searchParams = searchParams.append('page',pageNumber);

    const userSession: {
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userSession')!);

    const headers= new HttpHeaders()
      .set('Authorization', 'Bearer '+userSession._token);
    return this.http
      .get<MoviesResponseData>(
        // 'https://api.themoviedb.org/3/movie/top_rated',
        'http://localhost:8080/movies/top_rated',
        {
          params: searchParams,
          headers: headers
        }
      );
  }

  fetchMovieDetailsRequest(movie_id: string){
    // let searchParams = new HttpParams();
    // searchParams = searchParams.append('api_key','029dea97c6491c890795a485b2ebdbc0');
    // searchParams = searchParams.append('language','en-US');
    // searchParams = searchParams.append('append_to_response','videos');

    const userSession: {
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userSession')!);

    const headers= new HttpHeaders()
      .set('Authorization', 'Bearer ' + userSession._token);

    return this.http
      .get<MovieDetailed>(
        // `https://api.themoviedb.org/3/movie/${movie_id}`
        `http://localhost:8080/movie/${movie_id}`
        ,
        {
          // params: searchParams
          headers: headers
        }
      );
  }

  updateMovieDetailsRequest(movie_id: string, new_budget: string){

    const userSession: {
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userSession')!);

    const headers= new HttpHeaders()
      .set('Authorization', 'Bearer ' + userSession._token);

    return this.http
      .get<MovieDetailed>(
        `http://localhost:8080/movie/${movie_id}/${new_budget}`
        ,
        {
          headers: headers
        }
      );
  }

  getGenreById(id: number): string{
    let genre = '';
    switch (id) {
      case 28:
        genre = "Action";
        break;
      case 12:
        genre = "Adventure";
        break;
      case 16:
        genre = "Animation";
        break;
      case 35:
        genre = "Comedy";
        break;
      case 80:
        genre = "Crime";
        break;
      case 99:
        genre = "Documentary";
        break;
      case 18:
        genre = "Drama";
        break;
      case 10751:
        genre = "Family";
        break;
      case 14:
        genre = "Fantasy";
        break;
      case 36:
        genre = "History";
        break;
      case 27:
        genre = "Horror";
        break;
      case 10402:
        genre = "Music";
        break;
      case 9648:
        genre = "Mystery";
        break;
      case 10749:
        genre = "Romance";
        break;
      case 878:
        genre = "Science Fiction";
        break;
      case 10770:
        genre = "TV Movie";
        break;
      case 53:
        genre = "Thriller";
        break;
      case 10752:
        genre = "War";
        break;
      case 37:
        genre = "Western";
        break;
    }
    return genre;
  }

}
