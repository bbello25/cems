import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebApiKey } from '../_models/webApiKey';
import { Local } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;


  constructor(private http: HttpClient) {
  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }


  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl + 'login', { username, password })
      .pipe(map(response => {
        if (response && response.token) {
          if (response.user) {
            const userToSave = this.userFromToken(response.user);
            localStorage.setItem('currentUser', JSON.stringify(userToSave));
            this.currentUser = userToSave;
          }
          localStorage.setItem('token', response.token);
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
        }
        return response;
      }));
  }

  userFromToken(userFromToken): User {
    const user = new User();
    user.id = userFromToken.id;
    user.username = userFromToken.username;
    const webApiKey = new WebApiKey();
    webApiKey.apiKey = userFromToken.webApiKey;
    user.webApiKey = webApiKey;
    user.token = userFromToken.token;
    return user;
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.decodedToken = null;
    this.currentUser = null;
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;

    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}
