import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LogService } from 'src/app/_services/log.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { LogEndpointService } from 'src/app/_services/logEndpoint.service';
import { GroupListItem } from '../models/GroupListItem.dto';

@Injectable()
export class GroupDetailResolver implements Resolve<GroupListItem> {
  constructor(private router: Router,
    private alertify: AlertifyService,
    private logService: LogService,
    private cemsLogger: LogEndpointService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<GroupListItem> {
    const id: number = parseInt(route.params.id, 10);

    return this.logService.getGroup(id).pipe(
      catchError((err) => {
        console.error(err);
        this.alertify.error(`Failed to fetch group ${id}`);
        this.cemsLogger.log(err);
        return of(null);
      })
    );
  }
}
