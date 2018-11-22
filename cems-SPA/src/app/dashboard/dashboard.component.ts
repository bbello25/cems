import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ErrorLog } from '../_models/ErrorLog';
import { LogService } from '../_services/log.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logs$: Observable<ErrorLog[]>;

  constructor(
    private logService: LogService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.logs$ = this.logService.getLogs();
    // throw Error('test');
    // this.logService.getLogs().subscribe((response: Log[]) => {
    //   this.logs$ = response;
    //   console.log(this.logs);
    // });

    // throw new Error('Angular test error');
  }
}
