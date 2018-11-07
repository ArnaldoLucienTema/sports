import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../_models/user";
import {UserService} from './user.service';
import {SessionUser} from "../_models/session_user";


@Injectable()
export class AuthenticationService {
  public token: any;
  private session_user: SessionUser;
  public testing: boolean = false;
  private logged: boolean = false;

  requestOptions;

  constructor(private http: HttpClient) {


    // set token if saved in local storage
    if ((JSON.parse(localStorage.getItem('session_user')))) {
      this.setSessionUser(JSON.parse(localStorage.getItem('session_user')));
      this.token = this.session_user ? this.session_user.token : null;
    }
    this.requestOptions = this.token ? {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'jwt': this.token
        })
      } :
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ;
  }

  getSessionUser(): SessionUser {
    this.session_user = this.session_user ? this.session_user : JSON.parse(localStorage.getItem('session_user'));
    return this.session_user;
  }

  setSessionUser(session_user: SessionUser): void {
    localStorage.setItem('session_user', JSON.stringify(
      session_user
    ));

    this.session_user = session_user;
  }

  setSessionAvatar(avatar: string): void {
    this.session_user.avatar = avatar;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('/api/users/login', JSON.stringify({
      email: username,
      password: password
    }), this.requestOptions)
      .map((json: any) => {
        // login successful if there's a jwt token in the response
        if (json.token) {
          // set token property

          this.token = json.token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('session_user', JSON.stringify(json));

          this.setSessionUser(JSON.parse(localStorage.getItem('session_user')));

          this.logged = true;

          // return true to indicate successful login
          return of(json);
        } else {
          // return false to indicate failed login
          return of(false);
        }
      });
  }

  signup(username: string, password: string): Observable<boolean> {

    return this.http.post<any>('/api/users', JSON.stringify({email: username, password: password}), this.requestOptions)
      .map((json: any) => {
        // login successful if there's a jwt token in the response
        if (json.token) {

          // set token property
          this.token = json.token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('session_user', JSON.stringify(json));
          this.logged = true;

          this.setSessionUser(JSON.parse(localStorage.getItem('session_user')));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = undefined;
    this.logged = false;
    this.setSessionUser(undefined);
    localStorage.removeItem('session_user');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('session_user');
  }
}
