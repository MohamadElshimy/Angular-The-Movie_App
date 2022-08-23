import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MoviesCatalogComponent } from '../movies-catalog/movies-catalog.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuard } from '../services/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'movies',
    component: MoviesCatalogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
