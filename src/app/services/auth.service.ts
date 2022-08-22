import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { User } from '../shared/user.model';

export interface AuthResponseData {
  authenticated: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);

  validUsers: {email:string, password: string}[] = [
    {
      email: "youssry@gmail.com",
      password: "12345678"
    },
    {
      email: "wael@sumerge.com",
      password: "12345678"
    },
    {
      email: "ahmed@sumerge.com",
      password: "12345678"
    },
    {
      email: "mohamed@sumerge.com",
      password: "12345678"
    },
    {
      email: "maram@sumerge.com",
      password: "12345678"
    }];

  constructor(private router: Router) { }

  login(email: string, password: string) : AuthResponseData {

    let authResponseData: AuthResponseData = {authenticated: false, error: "Unknown Error Occured"};
    let found = false;
    for(let user of this.validUsers){
      if(user.email === email){
        if(user.password === password){
          authResponseData = {authenticated: true};
          const user = new User(email, this.generateToken());
          this.user.next(user);
        }else{
          authResponseData = {authenticated: false, error: "Incorrect Password!"};
        }
        found = true;
      }
    }
    if(!found){
      authResponseData = {authenticated: false, error: "Email does not exist!"};
    }

    return authResponseData;
  }

  logout() {
    this.user.next(null!);
    // this.router.navigate(['/auth']);
  }

  generateToken(){
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 30; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  
  }

}
