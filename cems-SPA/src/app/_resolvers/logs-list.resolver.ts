import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorLog } from '../_models/ErrorLog';
import { AlertifyService } from '../_services/alertify.service';
import { LogService } from '../_services/log.service';

@Injectable()
export class LogsListResolver implements Resolve<ErrorLog[]> {
  constructor(private router: Router, private alertify: AlertifyService, private logService: LogService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ErrorLog[]> {
    return this.logService.getLogs().pipe(
      catchError(err => {
        this.alertify.error('Problem retrieving data');
        return of(null);
      })
    );
  }
}
