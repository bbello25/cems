import { Injectable } from '@angular/core';
// import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { ErrorLog } from '../_models/ErrorLog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BrowserErrorLog } from '../_models/BrowserErrorLog';
import { PaginationResult } from '../_models/Pagination';
import { Logs } from 'selenium-webdriver';
import { User } from '../_models/user';
import { BrowserErrorLogFromServer } from '../_models/BrowerErrorLogFromServer';
import SimilarLog from '../_models/SimilarLog';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl = environment.apiUrl + 'userLog/';

  constructor(private http: HttpClient) {}

  getLogs(page?, itemsPerPage?, userParams?): Observable<PaginationResult<ErrorLog[]>> {
    const paginatedResult: PaginationResult<ErrorLog[]> = new PaginationResult<ErrorLog[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('timeUnits', userParams.timeUnits);
      params = params.append('timeValue', userParams.timeValue);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get<ErrorLog[]>(this.baseUrl, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getLog(id: number): Observable<ErrorLog> {
    return this.http.get<ErrorLog>(`${this.baseUrl}${id}`);
  }

  getSimilarLogs(logId: number) {
    return this.http.get<SimilarLog>(`${this.baseUrl}${logId}/similarLogs`);
  }
}
