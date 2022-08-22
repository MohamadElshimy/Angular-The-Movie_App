import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';

import { faClapperboard } from '@fortawesome/free-solid-svg-icons';

import { Movie } from '../shared/movie.model';
import { MoviesService } from '../services/movies.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-movies-catalog',
  templateUrl: './movies-catalog.component.html',
  styleUrls: ['./movies-catalog.component.css']
})
export class MoviesCatalogComponent implements OnInit {
  loadedMovies: Movie[] = [];
  pageCounter = 1;
  imageLinkPrefix = 'https://image.tmdb.org/t/p/w500';
  isFetchingMore = false;

  faClapperboard = faClapperboard;

  constructor(private http: HttpClient, 
    private moviesService: MoviesService, 
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchMovies(this.pageCounter);
  }

  private fetchMovies(pageNumber: number){
    this.moviesService.fetchMoviesRequest(pageNumber)
    .subscribe( responseData => {
      this.loadedMovies = this.loadedMovies.concat(responseData.results);
      this.pageCounter++;
      this.isFetchingMore = false;
    });
  }

  // onViewDetails(id: number){
  //   this.router.navigate(['/movies',id]);
  // }

  onViewMore(){
    this.isFetchingMore = true;
    this.fetchMovies(this.pageCounter);
  }

  getUrl(index:number){
    const urlString = this.loadedMovies[index].backdrop_path;
    return `url('${this.imageLinkPrefix}${urlString}')`;
  }

  getImage(index:number){
    const urlString = this.loadedMovies[index].poster_path;
    return `${this.imageLinkPrefix}${urlString}`;
  }

  getGenres(index:number){
    let genres ='';
    for(let genre_id of this.loadedMovies[index].genre_ids){
      genres += this.moviesService.getGenreById(+genre_id) + ', ';
    }
    genres = genres.slice(0, -2);
    return genres;
  }

  onLogOut(){
    this.authService.logout();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //     console.log('reached bottom');
    // }
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      console.log('bottom');
      this.onViewMore();
    }
  }

}
