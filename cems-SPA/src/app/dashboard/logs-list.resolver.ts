import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { LogService } from '../_services/log.service';
import { CemsLog } from '../_models/CemsLog.model';

@Injectable()
export class LogsListResolver implements Resolve<CemsLog[]> {
  constructor(private router: Router, private alertify: AlertifyService, private logService: LogService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<CemsLog[]> {
    return this.logService.getLogs().pipe(
      catchError(err => {
        console.error(err);
        this.alertify.error('Problem retrieving data');
        return of(null);
      })
    );
  }
}
