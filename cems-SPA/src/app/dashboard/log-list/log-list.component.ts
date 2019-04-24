import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CemsLog } from 'src/app/_models/CemsLog.model';
import { Pagination, PaginationResult } from 'src/app/_models/Pagination';
import { LogListQueryParams } from 'src/app/_models/LogListQueryParams';
import { LogService } from 'src/app/_services/log.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Platforms } from 'src/app/_models/Platforms.enum';
import { Router } from '@angular/router';
import { TrackedState } from 'src/app/_models/TrackedState.enum';
import { LogHeader } from '../models/LogHeader.dto';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {
  @Input() groupId?: number = null;
  logs?: LogHeader[];
  pagination?: Pagination;
  currentOrderBy: string;
  timeUnits = [
    { value: 'min', display: 'minutes' },
    { value: 'h', display: 'hours' },
    { value: 'd', display: 'days' }
  ];
  public queryParams: LogListQueryParams = new LogListQueryParams();

  constructor(private logService: LogService, private alertify: AlertifyService, private ref: ChangeDetectorRef, private router: Router) {
    this.queryParams.timeValue = 1;
    this.queryParams.timeUnits = 'd';
    this.queryParams.orderBy = 'timestamp';
    this.queryParams.includeBody = false;
  }

  ngOnInit() {
    this.logService.getLogs(this.groupId).subscribe(res => {
      this.logs = res.result as LogHeader[];
      this.pagination = res.pagination;
      this.ref.markForCheck();
    });
  }

  resetFilters() {
    this.queryParams.timeValue = 1;
    this.queryParams.timeUnits = 'd';
    this.loadLogs();
  }

  sort(orderBy) {
    this.queryParams.orderBy = orderBy;
    this.currentOrderBy = orderBy;
    this.loadLogs();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadLogs();
  }

  loadLogs() {
    this.logService.getLogs(this.groupId, this.pagination.currentPage, this.pagination.itemsPerPage, this.queryParams).subscribe(
      (res: any) => {
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

    if (log.currentState === TrackedState.undisplayed) {
      this.logService.updateLogStatus(log.id, TrackedState.displayed).subscribe({
        error: e => {
          console.error(e);
          this.alertify.warning('Failed to mark log as displayed');
        }
      });


    }

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
