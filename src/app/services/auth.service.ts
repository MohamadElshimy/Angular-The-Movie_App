import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../shared/user.model';

export interface AuthResponseData {
  jwt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;

  // validUsers: {email:string, password: string}[] = [
  //   {
  //     email: "youssry@gmail.com",
  //     password: "12345678"
  //   },
  //   {
  //     email: "wael@sumerge.com",
  //     password: "12345678"
  //   },
  //   {
  //     email: "ahmed@sumerge.com",
  //     password: "12345678"
  //   },
  //   {
  //     email: "mohamed@sumerge.com",
  //     password: "12345678"
  //   },
  //   {
  //     email: "maram@sumerge.com",
  //     password: "12345678"
  //   }];

  constructor(private router: Router, private http: HttpClient) { }

  login(email: string, password: string, remainLoggedin: any){

    // let authResponseData: AuthResponseData = {jwt:""};
    // let found = false;

    return this.http
      .post<AuthResponseData>(
        `http://localhost:8080/authenticate`
        ,
        {
          "username" : email,
          "password" : password
        }
      )
      .pipe(tap(resData => {
        const expiresIn = 3600;
        const expirationDate = new Date(new Date ().getTime() + expiresIn * 1000);
        const user = new User(email, resData.jwt!, expirationDate);
        this.user.next(user);
        // if(remainLoggedin){
        //   this.autoLogout(expiresIn * 1000);
        //   localStorage.setItem('userSession',JSON.stringify(user));
        // }
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userSession',JSON.stringify(user));
      }));
      

    // for(let user of this.validUsers){
    //   if(user.email === email){
    //     if(user.password === password){
    //       authResponseData = {authenticated: true};
    //       const expiresIn = 3600;
    //       const expirationDate = new Date(new Date ().getTime() + expiresIn * 1000);
    //       const user = new User(email, this.generateToken(), expirationDate);
    //       this.user.next(user);
    //       if(remainLoggedin){
    //         this.autoLogout(expiresIn * 1000);
    //         localStorage.setItem('userSession',JSON.stringify(user));
    //       }
    //     }else{
    //       authResponseData = {authenticated: false, error: "Incorrect Password!"};
    //     }
    //     found = true;
    //   }
    // }
    // if(!found){
    //   authResponseData = {authenticated: false, error: "Email does not exist!"};
    // }

    // return authResponseData;
  }

  logout() {
    this.user.next(null!);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userSession');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userSession: {
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userSession')!);
    if(!userSession){
      return;
    }
    const loadedUser = new User(
      userSession.email, 
      userSession._token,
      new Date(userSession._tokenExpirationDate));

      if(loadedUser.token){
        this.user.next(loadedUser);
        const expirationDuration =  new Date(userSession._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // generateToken(){
  //     var result = '';
  //     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     var charactersLength = characters.length;
  //     for ( var i = 0; i < 30; i++ ) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //    }
  //    return result;
  // }

}
