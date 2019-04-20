import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginationResult } from '../_models/Pagination';
import { CemsLog } from '../_models/CemsLog.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl = environment.apiUrl + 'EventLogs/';

  constructor(private http: HttpClient) { }

  getLogs(page?, itemsPerPage?, queryParams?): Observable<PaginationResult<CemsLog[]>> {
    const paginatedResult: PaginationResult<CemsLog[]> = new PaginationResult<CemsLog[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (queryParams != null) {
      params = params.append('timeUnits', queryParams.timeUnits);
      params = params.append('timeValue', queryParams.timeValue);
      params = params.append('orderBy', queryParams.orderBy);
    }

    return this.http.get<CemsLog[]>(this.baseUrl + 'logs', { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  // getLogGroups(page?, itemsPerPage?): Observable<PaginationResult<LogsGroup[]>> {
  //   const paginatedResult: PaginationResult<LogsGroup[]> = new PaginationResult<LogsGroup[]>();

  //   return this.http.get(this.baseUrl).pipe(
  //     map((response: any) => {
  //       paginatedResult.result = response.body;

  //       if (response.headers.get('Pagination') != null) {
  //         paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
  //       }
  //       return paginatedResult;
  //     })
  //   );
  // }

  getLog(id: number): Observable<CemsLog> {
    return this.http.get<CemsLog>(`${this.baseUrl}log/${id}`);
  }

  getSimilarLogs(logId: number, matchReason: string = 'similarity') {
    let params = new HttpParams();
    params = params.append('matchReason', matchReason);
    return this.http.get(`${this.baseUrl}log/${logId}/similar`, { params: params });
  }
}
