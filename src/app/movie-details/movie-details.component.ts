import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../services/movies.service';
import { MovieDetailed } from '../shared/movie-detailed.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  id: string;
  movie: MovieDetailed;
  // movie: MovieDetailed = {
  //   adult: '',
  //   backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
  //   belongs_to_collection: '',
  //   budget: '',
  //   genres: [{id: '', name: ''}],
  //   homepage: '',
  //   id: '',
  //   imdb_id: '',
  //   original_language: '',
  //   original_title: '',
  //   overview: '',
  //   popularity: '',
  //   poster_path: 'q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
  //   production_companies: [{id: '', logo_path: '', name: '', origin_country:''}],
  //   production_countries: [{iso_3166_1: '', name: ''}],
  //   release_date: '',
  //   revenue: '',
  //   runtime: '',
  //   spoken_languages: [{english_name: '', iso_639_1: '', name: ''}],
  //   status: '',
  //   tagline: '',
  //   title: '',
  //   video: '',
  //   vote_average: '',
  //   vote_count: '',
  // };
  imageLinkPrefix = 'https://image.tmdb.org/t/p/w500';

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.fetchMovieDetails(this.id);
  }

  private fetchMovieDetails(movie_id: string){
    this.moviesService.fetchMovieDetailsRequest(movie_id)
    .subscribe( responseData => {
      this.movie = responseData;
      console.log(responseData);
    });
  }

  getUrl(){
    const urlString = this.movie.backdrop_path;
    return `url('${this.imageLinkPrefix}${urlString}')`;
  }

  getImage(){
    console.log(this.movie);
    const urlString = this.movie.poster_path;
    return `${this.imageLinkPrefix}${urlString}`;
  }

  getGenres(){
    let genres = [];
    for(let genre of this.movie.genres){
      genres.push(genre.name);
    }
    return genres;
  }

  getCompanyImage(index: number){
    const urlString = this.movie.production_companies[index].logo_path;
    return `${this.imageLinkPrefix}${urlString}`;
  }

}
