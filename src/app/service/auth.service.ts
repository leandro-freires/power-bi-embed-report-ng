import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import AuthSettings  from '../config/auth-settings';
import { ResponseToken } from '../model/response-token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get accessToken(): Observable<string> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('scope', 'openid')
      .set('resource', AuthSettings.resourceUrl)
      .set('client_id', AuthSettings.applicationId)
      .set('username', AuthSettings.username)
      .set('password', AuthSettings.password);

    return this.http.post<ResponseToken>('api/azure', body, this.options(httpHeaders))
      .pipe(
        map((response: ResponseToken) =>  {
          if (response && response.access_token) {
            return response.access_token;
          }
          return '';
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  private options(headers?: HttpHeaders, params?: HttpParams): {} {
    return {
      headers: headers ? headers : this.buildHeaders(),
      params: params ? params : this.buildParams()
    };
  }

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders();
  }

  private buildParams(): HttpParams {
    return new HttpParams();
  }

}
