import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LogService } from '../_services/log.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginationResult } from '../_models/Pagination';
import { AlertifyService } from '../_services/alertify.service';
import { CemsLog } from '../_models/CemsLog.model';
import { Platforms } from '../_models/Platforms.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logs: CemsLog[];
  pagination: Pagination;
  currentOrderBy: string;
  timeUnits = [
    { value: 'min', display: 'minutes' },
    { value: 'h', display: 'hours' },
    { value: 'd', display: 'days' }
    // { value: 'm', display: 'months' }
  ];
  userParams: any = {};

  constructor(
    private logService: LogService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.logs = data['logs'].result;
      this.pagination = data['logs'].pagination;
    });

    this.userParams.timeValue = 1;
    this.userParams.timeUnits = 'd';
    this.userParams.orderBy = 'timestamp';
  }

  resetFilters() {
    this.userParams.timeValue = 1;
    this.userParams.timeUnits = 'd';
    this.loadLogs();
  }

  sort(orderBy) {
    this.userParams.orderBy = orderBy;
    this.currentOrderBy = orderBy;
    this.loadLogs();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadLogs();
  }

  loadLogs() {
    this.logService.getLogs(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(
      (res: PaginationResult<CemsLog[]>) => {
        this.logs = res.result;
        this.pagination = res.pagination;
        this.ref.detectChanges();
      },
      error1 => {
        this.alertify.error(error1);
      }
    );
  }

  redirectToLogDetail(logId: number) {
    const log = this.logs.find(l => {
      return l.id === logId;
    });

    switch (log.platform) {
      case Platforms.Dotnet: {
        this.router.navigate(['csharpLogDetail/' + logId]);
        break;
      }
      case Platforms.Javascript: {
        this.router.navigate(['jsLogDetail/' + logId]);
        break;
      }
      default: {
        this.alertify.error(`Unsupported platform ${Platforms[log.platform]}`);
      }
    }
  }

  onLogToggle($event: boolean, logId: number) {
    if ($event === true) {
      this.redirectToLogDetail(logId);
    }
  }

  getCorespondingPlatfrom(platformId: Platforms): string {
    return Platforms[platformId];
  }

}
