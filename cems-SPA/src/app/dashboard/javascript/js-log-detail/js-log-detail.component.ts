import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/_services/log.service';
import { CemsLog } from 'src/app/_models/CemsLog.model';
import { JavascripLog } from '../models/JavascriptLog.model';

@Component({
  selector: 'app-js-log-detail',
  templateUrl: './js-log-detail.component.html',
  styleUrls: ['./js-log-detail.component.css']
})
export class JsLogDetailComponent implements OnInit {
  @Input() log: JavascripLog;
  @Input() isTopLevel = true;
  public showStacktraceVariant = 'deminified';
  public showErrorDetails = true;

  public similarLogs: JavascripLog[] = [];
  public sameSessionLogs: JavascripLog[] = [];

  constructor(private activatedRoute: ActivatedRoute, private logService: LogService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.isTopLevel) {
      this.activatedRoute.data.subscribe(data => {
        this.log = data.log;
      });
      this.getSimilarLogs('similarity');
      this.getSimilarLogs('sessionId');
    }
  }


  toggleStackTraceVariant(variant: string) {
    this.showStacktraceVariant = variant;
  }

  toggleErrorDetails() {
    this.showErrorDetails = !this.showErrorDetails;
  }

  private getSimilarLogs(matchReason: string) {
    this.logService.getSimilarLogs(this.log.id, matchReason).subscribe((logs: any[]) => {
      logs.forEach((log: JavascripLog) => {
        if (matchReason === 'similarity') {
          const newLog = new JavascripLog(log);
          this.similarLogs.push(newLog);
        } else if (matchReason === 'sessionId') {
          const newLog = new JavascripLog(log);
          this.sameSessionLogs.push(newLog);
        }
      });
      this.ref.markForCheck();
    });
  }

  generateArray(obj: any) {
    return Object.keys(obj).map(key => {
      return { key: key, value: obj[key] };
    });
  }
}
