import { Injectable } from '@angular/core';
// import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { AuthService } from './auth.service';
import { ErrorLog } from '../_models/ErrorLog';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BrowserErrorLog } from '../_models/BrowserErrorLog';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl = environment.apiUrl + 'userLog/';

  constructor(private http: HttpClient) {
  }

  getLogs(): Observable<ErrorLog[]> {
    return this.http.get<ErrorLog[]>(this.baseUrl);
  }

  getLog(id: number): Observable<BrowserErrorLog> | Observable<ErrorLog> {
    return this.http.get(`${this.baseUrl}${id}`).pipe(
      map(log => {
        if (log.hasOwnProperty('userAgent')) {
          return log as BrowserErrorLog;
        } else {
          return log as ErrorLog;
        }
      })
    );
  }
}
