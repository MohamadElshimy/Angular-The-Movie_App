import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faClapperboard, faPhotoFilm, faFilm, faLock } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  logininForm: FormGroup;
  isLoading = false;
  error: string = null!;

  faUser = faUser;
  faClapperboard = faClapperboard;
  faPhotoFilm = faPhotoFilm;
  faFilm = faFilm;
  faLock = faLock;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.logininForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'remainLoggedin': new FormControl('')
    });
  }

  get email() {
    return this.logininForm.get('email');
  }

  get password() {
    return this.logininForm.get('password');
  }

  onSubmit() {
    if (!this.logininForm.valid) {
      return;
    }
    const email = this.logininForm.value.email;
    const password = this.logininForm.value.password;
    const remainLoggedin = this.logininForm.value.remainLoggedin;

    this.isLoading = true;

    let resData = this.authService.login(email, password, remainLoggedin);

    if (resData.authenticated){
      this.isLoading = false;
      this.error = null!;
      this.router.navigate(['/movies']);
    }else{
      this.error = resData.error!;
      this.isLoading = false;
    }

    this.logininForm.reset();
  }

}
