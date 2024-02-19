import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService extends ErrorHandlerService {
  apiUrl: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    super();
  }

  get<T>(api: string, callBack: (res: T) => void) {
    this.http
      .get<T>(this.apiUrl + api, this.httpOptions)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)))
      .subscribe({
        next: (res) => {
          callBack(res);
        },
      });
  }

  getDetail<T>(api: string, id: string, callBack: (res: T) => void) {
    this.http
      .get<T>(this.apiUrl + api + '/' + id, this.httpOptions)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)))
      .subscribe({
        next: (res) => {
          callBack(res);
        },
      });
  }

  post<T>(api: string, model: T, callBack: (res: T) => void) {
    this.http
      .post<T>(this.apiUrl + api, model, this.httpOptions)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)))
      .subscribe({
        next: (res) => {
          callBack(res);
        },
      });
  }

  put<T>(api: string, id: string, model: T, callBack: (res: T) => void) {
    this.http
      .put<T>(this.apiUrl + api + '/' + id, model, this.httpOptions)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)))
      .subscribe({
        next: (res) => {
          callBack(res);
        },
      });
  }

  delete<T>(api: string, id: string, callBack: (res: T) => void) {
    this.http
      .delete<T>(this.apiUrl + api + '/' + id, this.httpOptions)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)))
      .subscribe({
        next: (res) => {
          callBack(res);
        },
      });
  }
}
