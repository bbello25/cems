import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebApiKey } from '../_models/webApiKey';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl + 'login', { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const userToSave = new User();
          userToSave.id = user.user.id;
          userToSave.username = user.user.username;
          const webApiKey = new WebApiKey();
          webApiKey.apiKey = user.user.webApiKey;
          userToSave.webApiKey = webApiKey;
          userToSave.token = user.token;
          localStorage.setItem('currentUser', JSON.stringify(userToSave));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUserSubject.next(user.user);
        }
        return user;
      }));
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.decodedToken = null;
  }

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(user.token);
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
