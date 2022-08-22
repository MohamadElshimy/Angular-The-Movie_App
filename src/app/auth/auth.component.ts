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

    this.isLoading = true;

    let resData = this.authService.login(email, password);

    if (resData.authenticated){
      // console.log("Authenticated");
      this.isLoading = false;
      this.error = null!;
      this.router.navigate(['/movies']);
    }else{
      // console.log(resData.error);
      this.error = resData.error!;
      this.isLoading = false;
    }

    // authObs.subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );

    this.logininForm.reset();
  }

}
