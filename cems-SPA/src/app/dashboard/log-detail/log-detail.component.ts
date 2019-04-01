import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ErrorLog } from 'src/app/_models/ErrorLog';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/_services/log.service';
import { Observable } from 'rxjs';
import { BrowserErrorLog } from 'src/app/_models/BrowserErrorLog';
import SimilarLog from '../../_models/SimilarLog';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogDetailComponent implements OnInit {
  @Input() log$: Observable<BrowserErrorLog> | Observable<ErrorLog>;
  id: number;
  similarLogs: SimilarLog[];

  constructor(private logService: LogService, private route: ActivatedRoute) {
    this.similarLogs = Array<SimilarLog>();
  }

  isBrowserError(): boolean {
    return true;
    /*let _isBrowserError: boolean = false;
        this.log$.subscribe(res => _isBrowserError = (res instanceof BrowserErrorLog));
        return _isBrowserError;*/
  }

  isNullOrEmpty(field: string | Array<string>): boolean {
    if (field instanceof Array) {
      for (let i = 0; i < field.length; i++) {
        if (field[i] === undefined || field[i] === '') {
          return true;
        }
      }
      return false;
    } else {
      return field === undefined || field === '';
    }
  }

  test(obj: any) {
    console.log(obj);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doOnInit();
    });
  }

  doOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.log$ = this.logService.getLog(this.id);
    this.log$.pipe().subscribe(log => console.log(log));

    this.logService.getSimilarLogs(this.id).subscribe(logs => {
      // @ts-ignore
      for (const log of logs) {
        //this.similarLogs.push(log);
      }
    });
  }
}

// map((val: BrowserErrorLogFromServer) => {
//   const headers = JSON.parse(val.headers);
//   val.headers = headers;
//   return val as BrowserErrorLog;
// })
