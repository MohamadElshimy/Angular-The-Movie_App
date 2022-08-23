import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { MoviesCatalogComponent } from './movies-catalog.component';

describe('MoviesCatalogComponent', () => {
  let component: MoviesCatalogComponent;
  let fixture: ComponentFixture<MoviesCatalogComponent>;

  const testMovies = [{
    "adult":false,
    "backdrop_path":"/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    "genre_ids":[
       18,
       80
    ],
    "id":278,
    "original_language":"en",
    "original_title":"The Shawshank Redemption",
    "overview":"Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    "popularity":103.342,
    "poster_path":"/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    "release_date":"1994-09-23",
    "title":"The Shawshank Redemption",
    "video":false,
    "vote_average":8.7,
    "vote_count":22038
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ MoviesCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure that movies list is loaded correctly (Title)', () => {
    let fixture = TestBed.createComponent(MoviesCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    
    app.loadedMovies = testMovies;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').innerText).toEqual('The Shawshank Redemption');
  });

  it('should ensure that movies list is loaded correctly (Release Date)', () => {
    let fixture = TestBed.createComponent(MoviesCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    app.loadedMovies = testMovies;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').innerText).toContain('1994');
  });

  it('should ensure that movies list is loaded correctly (Adults)', () => {
    let fixture = TestBed.createComponent(MoviesCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    app.loadedMovies = testMovies;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').innerText).toContain('All ages');
  });

  it('should ensure that movies list is loaded correctly (Genres)', () => {
    let fixture = TestBed.createComponent(MoviesCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    app.loadedMovies = testMovies;
    fixture.detectChanges();
    let compiled = fixture.debugElement;
    let selected = compiled.query(By.css('.type'));
    expect(selected.nativeElement.innerText).toContain('Drama, Crime');
  });

  it('should ensure that movies list is loaded correctly (Overview)', () => {
    let fixture = TestBed.createComponent(MoviesCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    app.loadedMovies = testMovies;
    fixture.detectChanges();
    let compiled = fixture.debugElement;
    let selected = compiled.query(By.css('.text'));
    expect(selected.nativeElement.innerText).toContain('Framed in the 1940s');
  });

  it('should ensure that movies list is loaded correctly (Vote Average)', () => {
    let fixture = TestBed.createComponent(MoviesCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    app.loadedMovies = testMovies;
    fixture.detectChanges();
    let compiled = fixture.debugElement;
    let selected = compiled.query(By.css('.minutes'));
    expect(selected.nativeElement.innerText).toContain('8.7');
  });

  it('should ensure that movies list is loaded correctly (Log out)', () => {
    let fixture = TestBed.createComponent(MoviesCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    app.loadedMovies = testMovies;
    fixture.detectChanges();
    let compiled = fixture.debugElement;
    let selected = compiled.query(By.css('.logout'));
    expect(selected.nativeElement.innerText).toContain('Log Out');
  });

  it('should ensure that movies list is loaded correctly (Header)', () => {
    let fixture = TestBed.createComponent(MoviesCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    app.loadedMovies = testMovies;
    fixture.detectChanges();
    let compiled = fixture.debugElement;
    let selected = compiled.query(By.css('.logo'));
    expect(selected.nativeElement.innerText).toContain('The Movie App');
  });

});
