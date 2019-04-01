import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import CsharpErrorLog from '../models/CsharpErrorLog.model';
import { LogService } from 'src/app/_services/log.service';
import { ErrorLog } from 'src/app/_models/ErrorLog';

@Component({
  selector: 'app-csharp-log-detail',
  templateUrl: './csharp-log-detail.component.html',
  styleUrls: ['./csharp-log-detail.component.css']
})
export class CsharpLogDetailComponent implements OnInit {
  @Input() log: CsharpErrorLog;
  @Input() isTopLevel = true;
  public showRawStacktrace = false;
  public showErrorDetails = true;
  public similarLogs: CsharpErrorLog[] = [];

  constructor(private activatedRoute: ActivatedRoute, private logService: LogService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.isTopLevel) {
      this.activatedRoute.data.subscribe(data => {
        this.log = data.log;
      });
      this.getSimilarLogs();
    }
  }

  generateArray(obj: any) {
    return Object.keys(obj).map(key => {
      return { key: key, value: obj[key] };
    });
  }

  parseFileName() {
    const fullPath = this.log.stackTrace.stackFrames[0].file;
    const lastSlash = fullPath.lastIndexOf('/');
    const fileName = fullPath.substring(lastSlash + 1);
    return fileName;
  }

  toggleRawStackTrace() {
    this.showRawStacktrace = !this.showRawStacktrace;
  }

  toggleErrorDetails() {
    this.showErrorDetails = !this.showErrorDetails;
  }

  private getSimilarLogs() {
    this.logService.getSimilarLogs(this.log.id).subscribe((logs: ErrorLog[]) => {
      logs.forEach(logObj => {
        const newLog = new CsharpErrorLog(logObj);
        this.similarLogs.push(newLog);
      });
      this.ref.markForCheck();
    });
  }
}
