import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

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
  videoLinkPrefix = 'https://www.youtube.com/watch?v=';

  faPlay = faPlay;

  newBudget: string = '';

  constructor(private route: ActivatedRoute, private moviesService: MoviesService, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchMovieDetails(this.id);
  }

  private fetchMovieDetails(movie_id: string){
    this.moviesService.fetchMovieDetailsRequest(movie_id)
    .subscribe( responseData => {
      this.movie = responseData;
      // console.log(responseData);
    },
    () => {
      this.authService.logout();
    }
    );
  }

  private updateMovieDetails(movie_id: string, new_budget: string){
    this.moviesService.updateMovieDetailsRequest(movie_id, new_budget)
    .subscribe( responseData => {
      this.movie = responseData;
      this.newBudget = "";
    },
    () => {
      this.authService.logout();
    }
    );
  }

  onEdit() {
    this.updateMovieDetails(this.id, this.newBudget);
  }

  getUrl(){
    const urlString = this.movie.backdropPath;
    return `url('${this.imageLinkPrefix}${urlString}')`;
  }

  getImage(){
    const urlString = this.movie.posterPath;
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
    const urlString = this.movie.productionCompanies[index].logo_path;
    return `${this.imageLinkPrefix}${urlString}`;
  }

  getVideoLink(): string{
    const urlString = this.movie.videos.results[0].key;
    return `${this.videoLinkPrefix}${urlString}`;
  }

}
