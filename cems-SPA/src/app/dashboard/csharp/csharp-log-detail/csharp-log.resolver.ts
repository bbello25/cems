import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogService } from 'src/app/_services/log.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DotnetLogModel } from '../models/DotnetLog.model';

@Injectable()
export class CsharpLogResolver implements Resolve<any> {
  constructor(private router: Router, private alertify: AlertifyService, private logService: LogService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<DotnetLogModel> {
    const id: number = parseInt(route.params.id, 10);

    return this.logService.getLog(id).pipe(
      map(logObj => {
        try {
          const log = new DotnetLogModel(logObj);
          return log;
        } catch (error) {
          this.alertify.error(error.message);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }
}
