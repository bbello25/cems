import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/_services/log.service';
import { DotnetLogModel } from '../models/DotnetLog.model';

@Component({
  selector: 'app-csharp-log-detail',
  templateUrl: './csharp-log-detail.component.html',
  styleUrls: ['./csharp-log-detail.component.css']
})
export class CsharpLogDetailComponent implements OnInit {
  @Input() log: DotnetLogModel;
  @Input() isTopLevel = true;
  public showRawStacktrace = false;
  public showErrorDetails = true;
  public similarLogs: DotnetLogModel[] = [];

  constructor(private activatedRoute: ActivatedRoute, private logService: LogService, private ref: ChangeDetectorRef) { }

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
    const fullPath = this.log.dotnetExceptionDetails.dotnetStackTrace.stackFrames[0].file;
    let lastSlash = fullPath.lastIndexOf('/');
    if (lastSlash === -1) {
      lastSlash = fullPath.lastIndexOf('\\');
    }
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
    this.logService.getSimilarLogs(this.log.id).subscribe((logs: any[]) => {
      logs.forEach(logObj => {
        const newLog = new DotnetLogModel(logObj);
        this.similarLogs.push(newLog);
      });
      this.ref.markForCheck();
    });
  }
}
