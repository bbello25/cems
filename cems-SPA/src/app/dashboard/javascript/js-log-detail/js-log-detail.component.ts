import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/_services/log.service';
import JsErrorLog from '../models/JsErrorLog.model';
import { ErrorLog } from 'src/app/_models/ErrorLog';

@Component({
  selector: 'app-js-log-detail',
  templateUrl: './js-log-detail.component.html',
  styleUrls: ['./js-log-detail.component.css']
})
export class JsLogDetailComponent implements OnInit {
  @Input() log: JsErrorLog;
  @Input() isTopLevel = true;
  public showStacktraceVariant = 'deminified';
  public showErrorDetails = true;

  public similarLogs: JsErrorLog[] = [];

  constructor(private activatedRoute: ActivatedRoute, private logService: LogService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.isTopLevel) {
      this.activatedRoute.data.subscribe(data => {
        this.log = data.log;
      });
      this.getSimilarLogs();
    }
  }

  parseFileName() {
    let fullPath;
    if (this.log.stackTrace.deminifiedStackFrames[0] && this.log.stackTrace.deminifiedStackFrames[0].file) {
      fullPath = this.log.stackTrace.deminifiedStackFrames[0].file;
    } else if (this.log.stackTrace.minifiedStackFrames[0] && this.log.stackTrace.minifiedStackFrames[0].file) {
      fullPath = this.log.stackTrace.minifiedStackFrames[0].file;
    } else {
      return '';
    }
    const lastSlash = fullPath.lastIndexOf('/');
    const fileName = fullPath.substring(lastSlash + 1);
    return fileName;
  }

  toggleStackTraceVariant(variant: string) {
    this.showStacktraceVariant = variant;
  }

  toggleErrorDetails() {
    this.showErrorDetails = !this.showErrorDetails;
  }

  private getSimilarLogs() {
    this.logService.getSimilarLogs(this.log.id).subscribe((logs: ErrorLog[]) => {
      logs.forEach(logObj => {
        const newLog = new JsErrorLog(logObj);
        this.similarLogs.push(newLog);
      });
      this.ref.markForCheck();
    });
  }
}
