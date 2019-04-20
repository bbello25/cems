import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LogService } from 'src/app/_services/log.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CemsLog } from 'src/app/_models/CemsLog.model';
import { LogEndpointService } from 'src/app/_services/logEndpoint.service';
import { JavascripLog } from '../models/JavascriptLog.model';

@Injectable()
export class JsLogResolver implements Resolve<CemsLog> {
  constructor(private router: Router,
    private alertify: AlertifyService,
    private logService: LogService,
    private cemsLogger: LogEndpointService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<CemsLog> {
    const id: number = parseInt(route.params.id, 10);

    return this.logService.getLog(id).pipe(
      map(logObj => {
        try {
          const log = new JavascripLog(logObj);
          return log;
        } catch (error) {
          console.error(error);
          this.alertify.error(`Failed to fetch log ${id}`);
          this.cemsLogger.log(error);
          this.router.navigate(['/dashboard']);
        }
      }),
      catchError((err) => {
        console.error(err);
        this.alertify.error(`Failed to fetch log ${id}`);
        this.cemsLogger.log(err);
        return of(null);
      })
    );
  }
}
