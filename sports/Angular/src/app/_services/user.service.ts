import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {User} from '../_models/user';
import {catchError, tap} from "rxjs/operators";
import {UserInfoViewModel} from "../_models/user_info_viewmodel";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {SessionUser} from "../_models/session_user";


@Injectable()
export class UserService {

  mockUser: User = {
    email: 'arnaldo.trindade@closer.pt',
    password: 'password',
    name: 'Arnaldo Tema',
    avatar: 'https://images.unsplash.com/photo-1529808431514-65ce4a3d59f2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb011da7b9ee20720f6922750c7ce6c9&auto=format&fit=crop&w=676&q=80',
    last_login: '',
    subscription_expiration: '',
    id: '-1'
  };

  requestOptions;

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'jwt': authenticationService.token
      })
    };
  }


  getSessionUser(): Observable<User> {
    // return of(this.mockUser);
    let id = this.authenticationService.token.user.id;
    return this.http.get<User>('/api/users/' + id , this.requestOptions)
      .pipe(
        tap(data => {
          console.log('Get User data', data);
        }),
        catchError(UserService.handleError)
      );
  };

  aggregate_profile(profile_id): Observable<SessionUser> {

    let body = {id : profile_id};
    let session_user = this.authenticationService.getSessionUser();
    let id = session_user._id;

    console.log('Authentication Service Current Token: ' + this.authenticationService.token);

    return this.http.post<SessionUser>('/api/users/' + id + '/aggregate-profile', body, this.requestOptions)
      .pipe(
        tap(data => {
          console.log('POST Aggregate User to User-Profile', data);
        }),
        catchError(UserService.handleError)
      );
  }

  private static handleError(error: HttpErrorResponse) {

    if(error.status == 409){
      return new ErrorObservable(
        'Este perfil já se encontra agregado a outra conta.');
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Ocorreu um erro interno, por favor tente mais tarde.');
  };
}
