import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import CsharpErrorLog from './CsharpErrorLog.model';
import { LogService } from 'src/app/_services/log.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Injectable()
export class CsharpLogResolver implements Resolve<any> {
  constructor(private router: Router, private alertify: AlertifyService, private logService: LogService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CsharpErrorLog> {
    const id: number = route.params.id;

    return this.logService.getLog(id).pipe(
      map(logObj => {
        try {
          const log = new CsharpErrorLog(logObj);
          return log;
        } catch (error) {
          this.alertify.error(error);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }
}
