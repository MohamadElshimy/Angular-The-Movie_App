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
  imageLinkPrefix = 'https://image.tmdb.org/t/p/w500';

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchMovieDetails(this.id);
  }

  private fetchMovieDetails(movie_id: string){
    this.moviesService.fetchMovieDetailsRequest(movie_id)
    .subscribe( responseData => {
      this.movie = responseData;
    });
  }

  getUrl(){
    const urlString = this.movie.backdrop_path;
    return `url('${this.imageLinkPrefix}${urlString}')`;
  }

  getImage(){
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
