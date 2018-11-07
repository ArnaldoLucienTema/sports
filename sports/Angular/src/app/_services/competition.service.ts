import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry, tap} from 'rxjs/operators';
import {CompetitionViewModel} from '../_models/competition_viewmodel';
import {MatchViewModel} from "../_models/match_viewmodel";

@Injectable()
export class CompetitionService {

  mockCompetition: CompetitionViewModel[] = null;

  requestOptions;

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'jwt': authenticationService.token
      })
    };
  }

  getCompetiton(id: string): Observable<CompetitionViewModel> {
    return this.http.get<CompetitionViewModel>('/api/competitions/' + id, this.requestOptions)
      .pipe(
        tap(data => {
          console.log('GET Competitions', data);
        }),
        catchError(this.handleError)
      );
  };

  getCompetitons(): Observable<CompetitionViewModel[]> {
    return this.http.get<CompetitionViewModel[]>('/api/competitions/', this.requestOptions)
      .pipe(
        tap(data => {
          console.log('GET Competitions', data);
        }),
        catchError(this.handleError)
      );
  };

  getAllCompetitonsHeaders(): Observable<CompetitionViewModel[]> {
    return of(this.mockCompetition);
  };

  private handleError(error: HttpErrorResponse) {
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
      'Something bad happened; please try again later.');
  };
}
