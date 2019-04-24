import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { PaginationResult } from '../_models/Pagination';
import { CemsLog } from '../_models/CemsLog.model';
import { GroupListItem } from '../dashboard/models/GroupListItem.dto';
import { GroupListQueryParams } from '../_models/GroupListQueryParams';
import { Filter } from '../_models/Filter';
import { TrackedState } from '../_models/TrackedState.enum';
import { LogListQueryParams } from '../_models/LogListQueryParams';
import { LogHeader } from '../dashboard/models/LogHeader.dto';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl = environment.apiUrl + 'EventLogs/';

  constructor(private http: HttpClient) { }

  getLogs(groupId?, page?, itemsPerPage?, queryParams?: LogListQueryParams) {

    const paginatedResult: PaginationResult<CemsLog[] | LogHeader[]> = new PaginationResult<CemsLog[] | LogHeader[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (queryParams != null) {
      params = params.append('timeUnits', queryParams.timeUnits);
      params = params.append('timeValue', queryParams.timeValue.toString());
      params = params.append('orderBy', queryParams.orderBy);
      params = params.append('includeBody', String(queryParams.includeBody));
    }
    const url = (groupId) ? `${this.baseUrl}group/${groupId}/logs` : `${this.baseUrl}logs`;

    return this.http.get(url, { observe: 'response', params }).pipe(
      map((response: any) => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getLog(id: number): Observable<CemsLog> {
    return this.http.get<CemsLog>(`${this.baseUrl}log/${id}`);
  }

  updateLogStatus(id: number, newState: TrackedState) {
    const body = [{ id: id, newState: newState }];
    return this.http.post(`${this.baseUrl}updateLogsState`, body);
  }

  getSimilarLogs(logId: number, matchReason: string = 'similarity') {
    let params = new HttpParams();
    params = params.append('matchReason', matchReason);
    return this.http.get(`${this.baseUrl}log/${logId}/similar`, { params: params });
  }

  getLogGroups(page?, itemsPerPage?, queryParams?: GroupListQueryParams, filters?: Filter[]) {
    const paginatedResult: PaginationResult<GroupListItem[]> = new PaginationResult<GroupListItem[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (queryParams != null && queryParams.orderBy != null) {
      params = params.append('orderBy', queryParams.orderBy);
      params = params.append('orderByDirection', queryParams.orderByDir);
    }
    if (filters) {
      filters.forEach(f => {
        params = params.append('filter', `${f.attribute}__${f.filterType}__${f.filterValue}`);
      });
    }


    return this.http.get(this.baseUrl + 'logGroups', { observe: 'response', params }).pipe(
      map((response: any) => {
        const groupList = [];
        response.body.forEach(groupItem => {
          const groupListItem = new GroupListItem(groupItem);
          groupList.push(groupListItem);
        });
        paginatedResult.result = groupList;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getGroup(id): Observable<GroupListItem> {
    return this.http.get<GroupListItem>(`${this.baseUrl}group/${id}`);
  }

}
